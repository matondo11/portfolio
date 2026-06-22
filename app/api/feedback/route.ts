import { NextRequest, NextResponse } from "next/server";
import { getAllFeedback, addFeedback } from "@/lib/db";
import { FeedbackInput } from "@/types";

export async function GET() {
  try {
    if (!process.env.MONGODB_URI) {
      // No DB configured — return empty feedback array for dev
      return NextResponse.json({ feedback: [] });
    }

    const feedback = await getAllFeedback();
    return NextResponse.json({ feedback });
  } catch (err) {
    console.error('Failed to fetch feedback', err);
    return NextResponse.json({ feedback: [] });
  }
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

    if (!process.env.MONGODB_URI) {
      // Can't persist without DB — return created-like response
      const fake = { id: Date.now().toString(), name, rating, comment, role, createdAt: new Date().toISOString() };
      return NextResponse.json({ feedback: fake }, { status: 201 });
    }

    const entry = await addFeedback({ name, rating, comment, role });
    return NextResponse.json({ feedback: entry }, { status: 201 });
  } catch (e) {
    console.error('Invalid request body or server error', e);
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
}
