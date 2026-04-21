import { NextRequest, NextResponse } from "next/server";
import { getAllFeedback, addFeedback } from "@/lib/db";
import { FeedbackInput } from "@/types";

export async function GET() {
  const feedback = getAllFeedback();
  return NextResponse.json({ feedback });
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as FeedbackInput;

    const { name, rating, comment, role } = body;

    if (!name || !comment || !role) {
      return NextResponse.json(
        { error: "name, comment, and role are required" },
        { status: 400 }
      );
    }

    if (typeof rating !== "number" || rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: "rating must be a number between 1 and 5" },
        { status: 400 }
      );
    }

    const entry = addFeedback({ name, rating, comment, role });
    return NextResponse.json({ feedback: entry }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
}
