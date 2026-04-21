import { NextRequest, NextResponse } from "next/server";
import { getProjectByIdentifier, getProjects, incrementProjectViews } from "@/lib/projects";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as { projectId?: string };

    if (!body.projectId || typeof body.projectId !== "string") {
      return NextResponse.json(
        { error: "projectId is required." },
        { status: 400 }
      );
    }

    const project = await incrementProjectViews(body.projectId);

    if (!project) {
      return NextResponse.json({ error: "Project not found." }, { status: 404 });
    }

    return NextResponse.json({
      projectId: project.id,
      count: project.views,
    });
  } catch (error) {
    console.error("Failed to update view count:", error);
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const projectId = searchParams.get("projectId");

  if (projectId) {
    const project = await getProjectByIdentifier(projectId);
    return NextResponse.json({ projectId, count: project?.views ?? 0 });
  }

  const projects = await getProjects();
  return NextResponse.json({
    views: projects.map((project) => ({
      projectId: project.id,
      count: project.views,
    })),
  });
}
