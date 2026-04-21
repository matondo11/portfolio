import { NextResponse } from "next/server";
import { getFeedback } from "@/lib/feedback";

export async function GET() {
  try {
    const feedback = await getFeedback(true);
    return NextResponse.json(
      { feedback },
      {
        headers: {
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
        },
      }
    );
  } catch (error) {
    console.error("Error fetching approved feedback:", error);
    return NextResponse.json(
      { error: "Failed to fetch feedback." },
      { status: 500 }
    );
  }
}
