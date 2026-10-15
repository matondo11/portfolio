import { NextRequest, NextResponse } from "next/server";
import { incrementViews, getViews } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { projectId } = body as { projectId: string };

    if (!projectId || typeof projectId !== "string") {
      return NextResponse.json(
        { error: "projectId is required" },
        { status: 400 }
      );
    }

    if (!process.env.MONGODB_URI) {
      return NextResponse.json({ projectId, count: 0 }, { status: 200 });
    }

    const count = await incrementViews(projectId);
    return NextResponse.json({ projectId, count }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const projectId = searchParams.get("projectId");

  if (projectId) {
    if (!process.env.MONGODB_URI) {
      return NextResponse.json({ projectId, count: 0 });
    }
    const count = await getViews(projectId);
    return NextResponse.json({ projectId, count });
  }

  return NextResponse.json({ error: 'projectId é obrigatório' }, { status: 400 });
}
