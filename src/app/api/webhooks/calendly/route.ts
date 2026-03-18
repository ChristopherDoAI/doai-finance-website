import { createHmac } from "crypto";
import { NextRequest, NextResponse } from "next/server";

// ─── Types ────────────────────────────────────────────────────────────────────

interface CalendlyInvitee {
  name: string;
  email: string;
  timezone: string;
  text_reminder_number: string | null;
}

interface CalendlyScheduledEvent {
  uri: string;
  name: string;
  start_time: string;
  end_time: string;
  location: {
    type: string;
    join_url?: string;
  };
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
    console.warn("[Calendly] CALENDLY_WEBHOOK_SECRET not set — skipping verification in dev");
    return true;
  }
  const expected = createHmac("sha256", secret).update(rawBody).digest("hex");
  return signature === expected;
}

async function saveLead(data: {
  name: string;
  email: string;
  scheduledAt: string;
  timezone: string;
  eventName: string;
  cancelUrl: string;
  rescheduleUrl: string;
  utmSource?: string;
}) {
  // v0.2.0: Replace with Supabase insert
  // const { error } = await supabase.from("leads").insert({ ...data });
  console.log("[Calendly] Lead saved:", data);
}

async function pushToHubSpot(data: { name: string; email: string; scheduledAt: string }) {
  // v0.2.0: Replace with HubSpot API call
  // POST https://api.hubapi.com/crm/v3/objects/contacts
  console.log("[Calendly] HubSpot push:", data);
}

async function sendConfirmationEmail(data: { name: string; email: string; scheduledAt: string }) {
  // v0.2.0: Replace with Resend / SendGrid call
  console.log("[Calendly] Confirmation email sent to:", data.email);
}

// ─── Route handler ────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  // Read raw body for signature verification
  const rawBody = await req.text();
  const signature = req.headers.get("Calendly-Webhook-Signature") ?? "";

  // Verify HMAC signature
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

  // ── Handle: new booking ───────────────────────────────────────────────────
  if (event === "invitee.created") {
    const { name, email, timezone } = payload.invitee;
    const scheduledAt = payload.scheduled_event.start_time;
    const eventName = payload.scheduled_event.name;

    try {
      await Promise.all([
        saveLead({
          name,
          email,
          scheduledAt,
          timezone,
          eventName,
          cancelUrl: payload.cancel_url,
          rescheduleUrl: payload.reschedule_url,
          utmSource: payload.tracking?.utm_source,
        }),
        pushToHubSpot({ name, email, scheduledAt }),
        sendConfirmationEmail({ name, email, scheduledAt }),
      ]);

      console.log(`[Calendly] ✓ Booking processed for ${name} <${email}> at ${scheduledAt}`);
    } catch (err) {
      console.error("[Calendly] Error processing booking:", err);
      // Return 200 anyway to prevent Calendly retrying — log to Sentry in v0.2.0
    }
  }

  // ── Handle: cancellation ─────────────────────────────────────────────────
  if (event === "invitee.canceled") {
    const { name, email } = payload.invitee;
    console.log(`[Calendly] Booking cancelled for ${name} <${email}>`);
    // v0.2.0: Update HubSpot deal stage, send cancellation email
  }

  // Respond within 3s to avoid Calendly retry
  return NextResponse.json({ received: true }, { status: 200 });
}

// Calendly only sends POST — reject everything else
export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
