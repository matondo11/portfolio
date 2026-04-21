import { NextRequest, NextResponse } from "next/server";
import { incrementViews, getAllViews, getViews } from "@/lib/db";

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

    const count = incrementViews(projectId);
    return NextResponse.json({ projectId, count }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const projectId = searchParams.get("projectId");

  if (projectId) {
    const count = getViews(projectId);
    return NextResponse.json({ projectId, count });
  }

  const all = getAllViews();
  return NextResponse.json({ views: all });
}
