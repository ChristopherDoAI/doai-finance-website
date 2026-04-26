import { NextRequest, NextResponse } from "next/server";
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
const CRM_INBOUND_URL =
  process.env.NEXT_PUBLIC_CRM_INBOUND_URL ||
  "https://crm.doaisystems.co.uk/api/leads/inbound";

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

  // Build transcript note (truncated to 5000 chars)
  const transcriptText = (body.chatTranscript ?? [])
    .map((m) => `${m.role}: ${m.content}`)
    .join("\n")
    .slice(0, 5000);

  const note = [body.notes, transcriptText].filter(Boolean).join("\n\n---\n\n");

  try {
    const crmRes = await fetch(CRM_INBOUND_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Origin: "https://doaisystems.co.uk",
      },
      body: JSON.stringify({
        name: body.name || "Chat visitor",
        email: body.email,
        phone: body.phone || undefined,
        note: note || undefined,
        source: "website_chat",
        utm_source: body.utmSource || undefined,
        utm_medium: body.utmMedium || undefined,
        utm_campaign: body.utmCampaign || undefined,
      }),
    });

    if (!crmRes.ok) {
      const errBody = await crmRes.json().catch(() => ({}));
      console.error("[Chat Lead] CRM inbound failed:", crmRes.status, errBody);
      return NextResponse.json(
        { error: "Failed to save lead" },
        { status: 500 }
      );
    }

    const crmData = await crmRes.json() as { leadId?: string };
    return NextResponse.json({ success: true, leadId: crmData.leadId ?? null });
  } catch (err) {
    console.error("[Chat Lead] CRM fetch error:", err);
    return NextResponse.json(
      { error: "Failed to save lead" },
      { status: 500 }
    );
  }
}
