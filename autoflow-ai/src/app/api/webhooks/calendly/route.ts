import { createHmac } from "crypto";
import { NextRequest, NextResponse } from "next/server";

/**
 * Calendly webhook receiver — website side.
 *
 * Decision: the CRM already has its own /api/webhooks/calendly handler that
 * writes directly to Postgres. Ideally Calendly is configured to call the CRM
 * endpoint (https://crm.doaisystems.co.uk/api/webhooks/calendly) instead of
 * this one. If that switch has been made, this route can be deleted.
 *
 * Until that switch is confirmed, this route stays as a bridge: it verifies the
 * Calendly HMAC signature and forwards booking data to the CRM inbound endpoint
 * so the lead lands in Postgres either way.
 */

// ─── Types ────────────────────────────────────────────────────────────────────

interface CalendlyInvitee {
  name: string;
  email: string;
  timezone: string;
}

interface CalendlyScheduledEvent {
  name: string;
  start_time: string;
  end_time: string;
}

interface CalendlyWebhookPayload {
  event: "invitee.created" | "invitee.canceled";
  payload: {
    event: string;
    invitee: CalendlyInvitee;
    scheduled_event: CalendlyScheduledEvent;
    cancel_url: string;
    reschedule_url: string;
    tracking: {
      utm_source?: string;
      utm_medium?: string;
      utm_campaign?: string;
    };
  };
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function verifySignature(rawBody: string, signature: string): boolean {
  const secret = process.env.CALENDLY_WEBHOOK_SECRET;
  if (!secret) {
    console.error("[Calendly] CALENDLY_WEBHOOK_SECRET not set — rejecting webhook");
    return false;
  }
  const expected = createHmac("sha256", secret).update(rawBody).digest("hex");
  return signature === expected;
}

const CRM_INBOUND_URL =
  process.env.NEXT_PUBLIC_CRM_INBOUND_URL ||
  "https://crm.doaisystems.co.uk/api/leads/inbound";

// ─── Route handler ────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  const signature = req.headers.get("Calendly-Webhook-Signature") ?? "";

  if (!verifySignature(rawBody, signature)) {
    console.error("[Calendly] Signature verification failed");
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  let data: CalendlyWebhookPayload;
  try {
    data = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { event, payload } = data;

  if (event === "invitee.created") {
    const { name, email, timezone } = payload.invitee;
    const scheduledAt = payload.scheduled_event?.start_time;
    const eventName = payload.scheduled_event?.name;

    const note = [
      `Meeting: ${eventName || "Calendly booking"}`,
      scheduledAt ? `Scheduled: ${scheduledAt}` : null,
      timezone ? `Timezone: ${timezone}` : null,
      payload.cancel_url ? `Cancel: ${payload.cancel_url}` : null,
      payload.reschedule_url ? `Reschedule: ${payload.reschedule_url}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    try {
      await fetch(CRM_INBOUND_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Origin: "https://doaisystems.co.uk",
        },
        body: JSON.stringify({
          name,
          email,
          note,
          source: "website_calendly",
          utm_source: payload.tracking?.utm_source,
          utm_medium: payload.tracking?.utm_medium,
          utm_campaign: payload.tracking?.utm_campaign,
        }),
      });
      console.log(`[Calendly] Booking forwarded to CRM for ${name} <${email}>`);
    } catch (err) {
      console.error("[Calendly] CRM forward failed:", err);
    }
  }

  if (event === "invitee.canceled") {
    const { name, email } = payload.invitee;
    console.log(`[Calendly] Booking cancelled for ${name} <${email}>`);
    // Cancellation handling is owned by the CRM webhook handler.
  }

  return NextResponse.json({ received: true }, { status: 200 });
}

export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
