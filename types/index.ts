// ─── Project ──────────────────────────────────────────────────────────────────

export type ProjectStatus = "production" | "in-progress" | "idea";

export type Platform = "web" | "ios" | "android";
export type FilterTag = string;

export interface Skill {
  name: string;
  level: "mastered" | "learning" | "planned";
}

export interface Project {
  id?: string;
  _id?: string;
  title: string;
  description: string;
  image?: string;
  video?: string;
  technologies: string[];
  github?: string;
  githubUrl?: string;
  demo?: string;
  figma?: string;
  platform?: Platform[];
  status: ProjectStatus;
  featured?: boolean;
  createdAt?: Date;
  gradient?: string;
  longDescription?: string;
  problem?: string;
  solution?: string;
  results?: string[];
  liveUrl?: string;
  filterTags?: string[];
  views?: number;
}

// ─── User ─────────────────────────────────────────────────────────────────────

export interface User {
  _id?: string;
  username: string;
  password: string;
  createdAt: Date;
}

// ─── Feedback ─────────────────────────────────────────────────────────────────

export interface Feedback {
  id: string;
  name: string;
  rating: number;
  comment: string;
  role: string;
  createdAt: string;
}

export interface FeedbackInput {
  name: string;
  rating: number;
  comment: string;
  role: string;
}

// ─── View Counter ─────────────────────────────────────────────────────────────

export interface ViewRecord {
  projectId: string;
  count: number;
}