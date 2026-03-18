import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase";
import { createOrUpdateContact } from "@/lib/hubspot";

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

export async function POST(req: NextRequest) {
  let body: ChatLeadRequest;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!body.email) {
    return NextResponse.json({ error: "Email required" }, { status: 400 });
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
