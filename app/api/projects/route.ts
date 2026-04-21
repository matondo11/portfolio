import { NextRequest, NextResponse } from "next/server";
import { verifyAdminRequest } from "@/lib/admin";
import { createProject, getProjects } from "@/lib/projects";
import type {
  ProjectCategory,
  ProjectInput,
  ProjectPlatform,
  ProjectStatus,
  ProjectTechnologyFilter,
} from "@/types";

const VALID_STATUSES: ProjectStatus[] = ["production", "progress", "planned"];
const VALID_CATEGORIES: ProjectCategory[] = [
  "frontend",
  "backend",
  "fullstack",
  "mobile",
  "tools",
];
const VALID_PLATFORMS: ProjectPlatform[] = ["web", "android", "ios"];

function parseStringArray(value: unknown) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter((item): item is string => typeof item === "string")
    .map((item) => item.trim())
    .filter(Boolean);
}

function parseOptionalUrl(value: unknown) {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function normalizeCategory(value: unknown) {
  if (value === "nextjs") {
    return "frontend";
  }

  return VALID_CATEGORIES.includes(value as ProjectCategory)
    ? (value as ProjectCategory)
    : null;
}

function normalizeStatus(value: unknown) {
  if (value === "in-progress") {
    return "progress";
  }

  if (value === "paused") {
    return "planned";
  }

  return VALID_STATUSES.includes(value as ProjectStatus)
    ? (value as ProjectStatus)
    : null;
}

function parseExperienceYears(value: unknown) {
  if (typeof value !== "number" || Number.isNaN(value) || value < 0) {
    return 0;
  }

  return value;
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const categoryParam = searchParams.get("category") ?? searchParams.get("technology");
    const statusParam = searchParams.get("status");

    const projects = await getProjects({
      technology:
        categoryParam && normalizeCategory(categoryParam)
          ? (normalizeCategory(categoryParam) as ProjectTechnologyFilter)
          : "all",
      status:
        statusParam && normalizeStatus(statusParam)
          ? normalizeStatus(statusParam)
          : "all",
    });

    return NextResponse.json({ projects });
  } catch (error) {
    console.error("Failed to fetch projects:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects." },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  if (!verifyAdminRequest(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = (await req.json()) as
      | (Partial<ProjectInput> & {
          name?: string;
          stack?: unknown;
          learned?: unknown;
          preview?: {
            url?: string;
            type?: "image" | "video";
            alt?: string;
          };
          links?: {
            github?: string;
            live?: string;
            figma?: string;
          };
        })
      | null;

    const title =
      (typeof body?.title === "string" && body.title.trim()) ||
      (typeof body?.name === "string" && body.name.trim()) ||
      "";
    const description =
      typeof body?.description === "string" ? body.description.trim() : "";
    const category = normalizeCategory(body?.category);
    const status = normalizeStatus(body?.status);
    const technologies = parseStringArray(body?.technologies ?? body?.stack);
    const learned = parseStringArray(body?.learned);
    const platforms = parseStringArray(body?.platforms).filter((platform) =>
      VALID_PLATFORMS.includes(platform as ProjectPlatform)
    ) as ProjectPlatform[];

    const image =
      parseOptionalUrl(body?.image) ||
      (body?.preview?.type === "image" ? parseOptionalUrl(body.preview.url) : undefined);

    const video =
      parseOptionalUrl(body?.video) ||
      (body?.preview?.type === "video" ? parseOptionalUrl(body.preview.url) : undefined);

    const github = parseOptionalUrl(body?.github) || parseOptionalUrl(body?.links?.github);
    const live = parseOptionalUrl(body?.live) || parseOptionalUrl(body?.links?.live);
    const figma = parseOptionalUrl(body?.figma) || parseOptionalUrl(body?.links?.figma);

    if (!title || title.length < 3) {
      return NextResponse.json(
        { error: "Project title must be at least 3 characters." },
        { status: 400 }
      );
    }

    if (!description || description.length < 20) {
      return NextResponse.json(
        { error: "Project description must be at least 20 characters." },
        { status: 400 }
      );
    }

    if (!category) {
      return NextResponse.json(
        { error: "Project category is invalid." },
        { status: 400 }
      );
    }

    if (!status) {
      return NextResponse.json(
        { error: "Project status is invalid." },
        { status: 400 }
      );
    }

    if (!technologies.length) {
      return NextResponse.json(
        { error: "Add at least one technology to the project." },
        { status: 400 }
      );
    }

    if (!platforms.length) {
      return NextResponse.json(
        { error: "Select at least one supported platform." },
        { status: 400 }
      );
    }

    if (!image) {
      return NextResponse.json(
        { error: "Project image is required." },
        { status: 400 }
      );
    }

    const project = await createProject({
      slug: typeof body?.slug === "string" ? body.slug.trim() : undefined,
      title,
      description,
      image,
      video,
      status,
      technologies,
      platforms,
      github,
      live,
      figma,
      views: typeof body?.views === "number" ? body.views : 0,
      category,
      learned,
      experienceYears: parseExperienceYears(body?.experienceYears),
    });

    return NextResponse.json({ project }, { status: 201 });
  } catch (error) {
    console.error("Failed to create project:", error);
    return NextResponse.json(
      { error: "Failed to create project." },
      { status: 500 }
    );
  }
}
