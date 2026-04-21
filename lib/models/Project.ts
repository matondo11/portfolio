import { model, models, Schema, type Model } from "mongoose";
import type {
  ProjectCategory,
  ProjectMediaType,
  ProjectPlatform,
  ProjectStatus,
} from "@/types";

type LegacyProjectStatus = "in-progress" | "paused";
type LegacyProjectCategory = "nextjs";

export interface ProjectDocument {
  slug: string;
  title?: string;
  name?: string;
  description: string;
  image?: string;
  video?: string;
  technologies?: string[];
  stack?: string[];
  category: ProjectCategory | LegacyProjectCategory;
  platforms: ProjectPlatform[];
  status: ProjectStatus | LegacyProjectStatus;
  views: number;
  github?: string;
  live?: string;
  figma?: string;
  links?: {
    github?: string;
    live?: string;
    figma?: string;
  };
  preview?: {
    url: string;
    type: ProjectMediaType;
    alt: string;
  };
  learned?: string[];
  experienceYears?: number;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectLinksSchema = new Schema<ProjectDocument["links"]>(
  {
    github: String,
    live: String,
    figma: String,
  },
  { _id: false }
);

const ProjectPreviewSchema = new Schema<ProjectDocument["preview"]>(
  {
    url: { type: String, required: true, trim: true },
    type: {
      type: String,
      enum: ["image", "video"],
      required: true,
      default: "image",
    },
    alt: { type: String, required: true, trim: true },
  },
  { _id: false }
);

const ProjectSchema = new Schema<ProjectDocument>(
  {
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
    title: { type: String, trim: true },
    name: { type: String, trim: true },
    description: { type: String, required: true, trim: true },
    image: { type: String, trim: true },
    video: { type: String, trim: true },
    technologies: [{ type: String, trim: true }],
    stack: [{ type: String, trim: true }],
    category: {
      type: String,
      enum: ["frontend", "backend", "fullstack", "mobile", "tools", "nextjs"],
      required: true,
    },
    platforms: [
      {
        type: String,
        enum: ["web", "android", "ios"],
      },
    ],
    status: {
      type: String,
      enum: ["production", "progress", "planned", "in-progress", "paused"],
      required: true,
      default: "progress",
    },
    views: { type: Number, default: 0, min: 0 },
    github: { type: String, trim: true },
    live: { type: String, trim: true },
    figma: { type: String, trim: true },
    links: { type: ProjectLinksSchema, default: undefined },
    preview: { type: ProjectPreviewSchema, required: false },
    learned: [{ type: String, trim: true }],
    experienceYears: { type: Number, default: 0, min: 0 },
    sortOrder: { type: Number, default: 0 },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

ProjectSchema.index({ slug: 1 }, { unique: true });
ProjectSchema.index({ category: 1, status: 1, createdAt: -1 });

const Project =
  (models.Project as Model<ProjectDocument>) ||
  model<ProjectDocument>("Project", ProjectSchema);

export default Project;
