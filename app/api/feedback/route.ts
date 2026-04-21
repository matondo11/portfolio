import { NextRequest, NextResponse } from "next/server";
import { verifyAdminRequest } from "@/lib/admin";
import { createFeedback, getFeedback } from "@/lib/feedback";
import type { FeedbackInput } from "@/types";

export async function GET(req: NextRequest) {
  if (!verifyAdminRequest(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const feedback = await getFeedback(false);
    return NextResponse.json({ feedback });
  } catch (error) {
    console.error("Failed to fetch feedback:", error);
    return NextResponse.json(
      { error: "Failed to fetch feedback." },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as FeedbackInput;

    const name = body.name?.trim();
    const comment = body.comment?.trim();
    const role = body.role?.trim();
    const rating = body.rating;
    const projectId = body.projectId?.trim();

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

    if (name.length < 2 || role.length < 2 || comment.length < 10 || comment.length > 1000) {
      return NextResponse.json(
        { error: "Please provide a valid testimonial." },
        { status: 400 }
      );
    }

    const entry = await createFeedback({
      name,
      rating,
      comment,
      role,
      projectId,
    });

    return NextResponse.json(
      {
        feedback: entry,
        message: "Feedback received! It will appear after review.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Failed to create feedback:", error);
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
}
