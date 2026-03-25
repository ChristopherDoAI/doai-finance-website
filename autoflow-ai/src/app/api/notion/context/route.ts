import { NextResponse } from "next/server";
import { fetchMontyContext } from "@/lib/notion";

export const revalidate = 300; // revalidate every 5 minutes

export async function GET() {
  try {
    const context = await fetchMontyContext();
    return NextResponse.json({ context });
  } catch (err) {
    console.error("[Notion Context API] Error:", err);
    return NextResponse.json(
      { error: "Failed to fetch context", context: "" },
      { status: 500 }
    );
  }
}
