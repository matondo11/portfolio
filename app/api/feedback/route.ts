import { NextRequest, NextResponse } from "next/server";
import { getAllFeedback, addFeedback } from "@/lib/db";
import { FeedbackInput } from "@/types";
import { requireAuth } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const all = url.searchParams.get('all') === 'true';
    if (all) {
      const auth = requireAuth(request);
      if (!auth.ok) {
        return NextResponse.json({ error: auth.error || 'Não autorizado' }, { status: 401 });
      }
    }

    if (!process.env.MONGODB_URI) {
      return NextResponse.json({ feedback: [] });
    }

    const feedback = await getAllFeedback(!all);
    return NextResponse.json({ feedback });
  } catch (err) {
    console.error('Failed to fetch feedback', err);
    return NextResponse.json({ feedback: [] });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as FeedbackInput;

    const name = typeof body.name === 'string' ? body.name.trim() : '';
    const comment = typeof body.comment === 'string' ? body.comment.trim() : '';
    const role = typeof body.role === 'string' ? body.role.trim() : '';
    const { rating } = body;

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

    if (name.length > 100 || role.length > 120 || comment.length > 2000) {
      return NextResponse.json({ error: 'Os campos excedem o tamanho permitido' }, { status: 400 });
    }

    if (!process.env.MONGODB_URI) {
      return NextResponse.json({ error: 'Banco de dados não configurado' }, { status: 503 });
    }

    const entry = await addFeedback({ name, rating, comment, role });
    return NextResponse.json({ feedback: entry }, { status: 201 });
  } catch (e) {
    console.error('Invalid request body or server error', e);
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
}
