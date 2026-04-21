import { NextResponse } from "next/server";
import { incrementProjectViews } from "@/lib/projects";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function POST(_req: Request, { params }: RouteContext) {
  try {
    const { id } = await params;
    const project = await incrementProjectViews(id);

    if (!project) {
      return NextResponse.json({ error: "Project not found." }, { status: 404 });
    }

    return NextResponse.json({
      projectId: project.id,
      views: project.views,
    });
  } catch (error) {
    console.error("Failed to increment project views:", error);
    return NextResponse.json(
      { error: "Failed to update project views." },
      { status: 500 }
    );
  }
}
