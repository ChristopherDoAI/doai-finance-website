import { createHmac } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase";
import { createOrUpdateContact } from "@/lib/hubspot";

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
  calendlyEventUri?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
}): Promise<string | null> {
  const supabase = createServiceClient();
  const { data: lead, error } = await supabase
    .from("leads")
    .insert({
      name: data.name,
      email: data.email,
      source: "booking" as const,
      scheduled_at: data.scheduledAt,
      timezone: data.timezone,
      cancel_url: data.cancelUrl,
      reschedule_url: data.rescheduleUrl,
      calendly_event_uri: data.calendlyEventUri || null,
      utm_source: data.utmSource || null,
      utm_medium: data.utmMedium || null,
      utm_campaign: data.utmCampaign || null,
      lead_score: 50,
    })
    .select("id")
    .single();

  if (error) {
    console.error("[Calendly] Supabase insert error:", error);
    throw error;
  }
  console.log(`[Calendly] Lead saved: ${lead?.id}`);
  return lead?.id || null;
}

async function pushToHubSpot(data: {
  name: string;
  email: string;
  scheduledAt: string;
  leadId?: string | null;
}): Promise<void> {
  const nameParts = data.name.split(" ");
  const hubspotContactId = await createOrUpdateContact({
    email: data.email,
    firstname: nameParts[0] || "",
    lastname: nameParts.slice(1).join(" ") || "",
    lifecyclestage: "lead",
    hs_lead_status: "NEW",
  });

  // Store HubSpot contact ID back in Supabase
  if (hubspotContactId && data.leadId) {
    const supabase = createServiceClient();
    await supabase
      .from("leads")
      .update({ hubspot_contact_id: hubspotContactId })
      .eq("id", data.leadId);
  }

  console.log(`[Calendly] HubSpot contact: ${hubspotContactId}`);
}

async function sendConfirmationEmail(data: { name: string; email: string; scheduledAt: string }) {
  // TODO: Implement with Resend or SendGrid
  console.log("[Calendly] Confirmation email skipped (not implemented):", data.email);
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
      // Save lead first (need the ID for HubSpot backlink)
      const leadId = await saveLead({
        name,
        email,
        scheduledAt,
        timezone,
        eventName,
        cancelUrl: payload.cancel_url,
        rescheduleUrl: payload.reschedule_url,
        calendlyEventUri: payload.event,
        utmSource: payload.tracking?.utm_source,
        utmMedium: payload.tracking?.utm_medium,
        utmCampaign: payload.tracking?.utm_campaign,
      });

      // Push to HubSpot and send email in parallel
      await Promise.all([
        pushToHubSpot({ name, email, scheduledAt, leadId }),
        sendConfirmationEmail({ name, email, scheduledAt }),
      ]);

      console.log(`[Calendly] Booking processed for ${name} <${email}>`);
    } catch (err) {
      console.error("[Calendly] Error processing booking:", err);
    }
  }

  // ── Handle: cancellation ─────────────────────────────────────────────────
  if (event === "invitee.canceled") {
    const { name, email } = payload.invitee;
    console.log(`[Calendly] Booking cancelled for ${name} <${email}>`);
    // TODO: Update lead status in Supabase, update HubSpot deal stage
  }

  // Respond within 3s to avoid Calendly retry
  return NextResponse.json({ received: true }, { status: 200 });
}

// Calendly only sends POST — reject everything else
export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
