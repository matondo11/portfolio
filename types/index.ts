// ─── Project ──────────────────────────────────────────────────────────────────

export type ProjectStatus = "production" | "in-progress" | "idea";

export type Platform = "web" | "ios" | "android";

export interface Project {
  id?: string;
  _id?: string;
  title: string;
  description: string;
  image: string;
  video?: string;
  technologies: string[];
  github?: string;
  demo?: string;
  figma?: string;
  platform: Platform[];
  status: ProjectStatus;
  featured?: boolean;
  createdAt: Date;
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