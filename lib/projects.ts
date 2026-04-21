import mongoose from "mongoose";
import { projectSeeds, projects as fallbackProjects } from "@/data/projects";
import { getCloudinaryVideoPoster } from "@/lib/cloudinary";
import dbConnect, { isMongoConfigured } from "@/lib/mongodb";
import ProjectModel, { type ProjectDocument } from "@/lib/models/Project";
import type {
  Project,
  ProjectCategory,
  ProjectInput,
  ProjectPlatform,
  ProjectStatus,
  ProjectStatusFilter,
  ProjectTechnologyFilter,
} from "@/types";

type ProjectFilters = {
  technology?: ProjectTechnologyFilter | null;
  status?: ProjectStatusFilter | null;
};

const PROJECT_PLACEHOLDER_IMAGE =
  "https://res.cloudinary.com/demo/image/upload/sample.jpg";

const VALID_CATEGORIES: ProjectCategory[] = [
  "frontend",
  "backend",
  "fullstack",
  "mobile",
  "tools",
];

const VALID_PLATFORMS: ProjectPlatform[] = ["web", "android", "ios"];
const VALID_STATUSES: ProjectStatus[] = ["production", "progress", "planned"];

let projectSeedPromise: Promise<void> | null = null;

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function normalizeStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter((item): item is string => typeof item === "string")
    .map((item) => item.trim())
    .filter(Boolean);
}

function normalizeCategory(
  value: ProjectDocument["category"] | ProjectCategory | null | undefined
): ProjectCategory {
  if (value === "nextjs") {
    return "frontend";
  }

  return VALID_CATEGORIES.includes(value as ProjectCategory)
    ? (value as ProjectCategory)
    : "frontend";
}

function normalizeStatus(
  value: ProjectDocument["status"] | ProjectStatus | null | undefined
): ProjectStatus {
  if (value === "in-progress") {
    return "progress";
  }

  if (value === "paused") {
    return "planned";
  }

  return VALID_STATUSES.includes(value as ProjectStatus)
    ? (value as ProjectStatus)
    : "planned";
}

function normalizePlatforms(value: unknown): ProjectPlatform[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter((platform): platform is ProjectPlatform =>
    VALID_PLATFORMS.includes(platform as ProjectPlatform)
  );
}

function normalizeExperienceYears(value: unknown) {
  if (typeof value !== "number" || Number.isNaN(value) || value < 0) {
    return 0;
  }

  return value;
}

function normalizeProject(
  project: Partial<ProjectDocument> & { _id?: mongoose.Types.ObjectId }
) {
  const title = project.title?.trim() || project.name?.trim() || "Untitled project";
  const previewUrl = project.preview?.url?.trim();
  const image =
    project.image?.trim() ||
    (project.preview?.type === "video" && previewUrl
      ? getCloudinaryVideoPoster(previewUrl, 1200)
      : previewUrl) ||
    PROJECT_PLACEHOLDER_IMAGE;

  const video =
    project.video?.trim() ||
    (project.preview?.type === "video" ? previewUrl : undefined);

  return {
    id: project._id?.toString() ?? project.slug ?? slugify(title),
    slug: project.slug ?? slugify(title),
    title,
    description: project.description?.trim() || "",
    image,
    video,
    status: normalizeStatus(project.status),
    technologies: normalizeStringArray(project.technologies ?? project.stack),
    platforms: normalizePlatforms(project.platforms),
    github: project.github?.trim() || project.links?.github?.trim() || undefined,
    live: project.live?.trim() || project.links?.live?.trim() || undefined,
    figma: project.figma?.trim() || project.links?.figma?.trim() || undefined,
    views: typeof project.views === "number" && project.views >= 0 ? project.views : 0,
    category: normalizeCategory(project.category),
    learned: normalizeStringArray(project.learned),
    experienceYears: normalizeExperienceYears(project.experienceYears),
    createdAt: project.createdAt?.toISOString?.() ?? undefined,
    updatedAt: project.updatedAt?.toISOString?.() ?? undefined,
  } satisfies Project;
}

function filterFallbackProjects(filters: ProjectFilters = {}) {
  return fallbackProjects.filter((project) => {
    const categoryMatches =
      !filters.technology ||
      filters.technology === "all" ||
      project.category === filters.technology;

    const statusMatches =
      !filters.status || filters.status === "all" || project.status === filters.status;

    return categoryMatches && statusMatches;
  });
}

async function ensureProjectSeed() {
  if (!isMongoConfigured()) {
    return;
  }

  await dbConnect();

  const count = await ProjectModel.estimatedDocumentCount();
  if (count > 0) {
    return;
  }

  if (!projectSeedPromise) {
    projectSeedPromise = ProjectModel.insertMany(
      projectSeeds.map((project, index) => ({
        slug: project.slug || slugify(project.title),
        title: project.title.trim(),
        description: project.description.trim(),
        image: project.image.trim(),
        video: project.video?.trim() || undefined,
        technologies: normalizeStringArray(project.technologies),
        category: project.category,
        platforms: normalizePlatforms(project.platforms),
        status: project.status,
        github: project.github?.trim() || undefined,
        live: project.live?.trim() || undefined,
        figma: project.figma?.trim() || undefined,
        views: project.views ?? 0,
        learned: normalizeStringArray(project.learned),
        experienceYears: normalizeExperienceYears(project.experienceYears),
        sortOrder: index,
      })),
      { ordered: false }
    )
      .then(() => undefined)
      .catch((error: unknown) => {
        const isDuplicateKey =
          typeof error === "object" &&
          error !== null &&
          "code" in error &&
          (error as { code?: number }).code === 11000;

        if (!isDuplicateKey) {
          throw error;
        }
      })
      .finally(() => {
        projectSeedPromise = null;
      });
  }

  await projectSeedPromise;
}

export async function getProjects(filters: ProjectFilters = {}) {
  if (!isMongoConfigured()) {
    return filterFallbackProjects(filters);
  }

  try {
    await ensureProjectSeed();

    const query: Record<string, string> = {};

    if (filters.technology && filters.technology !== "all") {
      query.category = filters.technology;
    }

    if (filters.status && filters.status !== "all") {
      query.status = filters.status;
    }

    const docs = await ProjectModel.find(query)
      .sort({ sortOrder: 1, createdAt: -1 })
      .lean();

    return docs.map((project) =>
      normalizeProject(project as ProjectDocument & { _id?: mongoose.Types.ObjectId })
    );
  } catch (error) {
    console.error("Failed to fetch MongoDB projects. Falling back to local data.", error);
    return filterFallbackProjects(filters);
  }
}

export async function getProjectByIdentifier(identifier: string) {
  if (!isMongoConfigured()) {
    return fallbackProjects.find(
      (project) => project.id === identifier || project.slug === identifier
    ) ?? null;
  }

  try {
    await ensureProjectSeed();

    const query = mongoose.Types.ObjectId.isValid(identifier)
      ? { $or: [{ _id: identifier }, { slug: identifier }] }
      : { slug: identifier };

    const doc = await ProjectModel.findOne(query).lean();

    if (!doc) {
      return (
        fallbackProjects.find(
          (project) => project.id === identifier || project.slug === identifier
        ) ?? null
      );
    }

    return normalizeProject(doc as ProjectDocument & { _id?: mongoose.Types.ObjectId });
  } catch (error) {
    console.error("Failed to fetch MongoDB project. Falling back to local data.", error);
    return (
      fallbackProjects.find(
        (project) => project.id === identifier || project.slug === identifier
      ) ?? null
    );
  }
}

export async function createProject(input: ProjectInput) {
  await dbConnect();

  const project = await ProjectModel.create({
    slug: slugify(input.slug || input.title),
    title: input.title.trim(),
    description: input.description.trim(),
    image: input.image.trim(),
    video: input.video?.trim() || undefined,
    technologies: normalizeStringArray(input.technologies),
    category: normalizeCategory(input.category),
    platforms: normalizePlatforms(input.platforms),
    status: normalizeStatus(input.status),
    github: input.github?.trim() || undefined,
    live: input.live?.trim() || undefined,
    figma: input.figma?.trim() || undefined,
    views: input.views ?? 0,
    learned: normalizeStringArray(input.learned),
    experienceYears: normalizeExperienceYears(input.experienceYears),
  });

  return normalizeProject(
    project.toObject() as ProjectDocument & { _id?: mongoose.Types.ObjectId }
  );
}

export async function incrementProjectViews(identifier: string) {
  if (!isMongoConfigured()) {
    const project = fallbackProjects.find(
      (item) => item.id === identifier || item.slug === identifier
    );

    return project ? { ...project, views: project.views + 1 } : null;
  }

  await dbConnect();

  const query = mongoose.Types.ObjectId.isValid(identifier)
    ? { $or: [{ _id: identifier }, { slug: identifier }] }
    : { slug: identifier };

  const project = await ProjectModel.findOneAndUpdate(
    query,
    { $inc: { views: 1 } },
    { new: true }
  ).lean();

  return project
    ? normalizeProject(project as ProjectDocument & { _id?: mongoose.Types.ObjectId })
    : null;
}
