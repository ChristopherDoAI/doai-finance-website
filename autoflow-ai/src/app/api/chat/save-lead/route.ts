import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase";
import { createOrUpdateContact } from "@/lib/hubspot";
import { checkRateLimit } from "@/lib/rate-limit";

interface ChatLeadRequest {
  name?: string;
  email: string;
  phone?: string;
  notes?: string;
  chatTranscript: Array<{ role: string; content: string }>;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_BODY_SIZE = 100_000; // 100KB

export async function POST(req: NextRequest) {
  // Rate limiting by IP
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";
  const { allowed } = checkRateLimit(`lead:${ip}`);
  if (!allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please wait a moment." },
      { status: 429 }
    );
  }

  // Body size check
  const contentLength = parseInt(req.headers.get("content-length") || "0", 10);
  if (contentLength > MAX_BODY_SIZE) {
    return NextResponse.json({ error: "Request too large" }, { status: 413 });
  }

  let body: ChatLeadRequest;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!body.email || !EMAIL_REGEX.test(body.email)) {
    return NextResponse.json({ error: "Valid email required" }, { status: 400 });
  }

  const supabase = createServiceClient();

  try {
    const { data, error } = await supabase
      .from("leads")
      .insert({
        name: body.name || "Chat visitor",
        email: body.email,
        phone: body.phone || null,
        source: "chat" as const,
        chat_transcript: body.chatTranscript as unknown as Record<string, unknown>[],
        notes: body.notes || null,
        utm_source: body.utmSource || null,
        utm_medium: body.utmMedium || null,
        utm_campaign: body.utmCampaign || null,
      })
      .select("id")
      .single();

    if (error) throw error;

    // Push to HubSpot (non-blocking)
    try {
      const nameParts = (body.name || "Chat Visitor").split(" ");
      const hubspotContactId = await createOrUpdateContact({
        email: body.email,
        firstname: nameParts[0] || "Chat",
        lastname: nameParts.slice(1).join(" ") || "Visitor",
        phone: body.phone,
        lifecyclestage: "lead",
        hs_lead_status: "NEW",
      });

      if (hubspotContactId && data?.id) {
        await supabase
          .from("leads")
          .update({ hubspot_contact_id: hubspotContactId })
          .eq("id", data.id);
      }
    } catch (hubspotErr) {
      console.error("[Chat Lead] HubSpot push failed:", hubspotErr);
    }

    return NextResponse.json({ success: true, leadId: data?.id });
  } catch (err) {
    console.error("[Chat Lead] Save failed:", err);
    return NextResponse.json(
      { error: "Failed to save lead" },
      { status: 500 }
    );
  }
}
