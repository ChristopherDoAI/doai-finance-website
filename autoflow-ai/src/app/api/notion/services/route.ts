import { NextResponse } from "next/server";
import { fetchServices } from "@/lib/notion";

export const revalidate = 300; // ISR: revalidate every 5 minutes

export async function GET() {
  try {
    const services = await fetchServices();
    return NextResponse.json({ services });
  } catch (err) {
    console.error("[Notion Services API] Error:", err);
    return NextResponse.json(
      { error: "Failed to fetch services", services: [] },
      { status: 500 }
    );
  }
}
