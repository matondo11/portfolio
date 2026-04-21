// ─── Project ──────────────────────────────────────────────────────────────────

export type ProjectStatus = "production" | "in-progress" | "paused";

export type ProjectTag =
  | "React"
  | "Next.js"
  | "Node.js"
  | "NestJS"
  | "Fullstack"
  | "TypeScript"
  | "PostgreSQL"
  | "Prisma"
  | "TailwindCSS"
  | "MongoDB"
  | "Socket.io"
  | "REST API"
  | "WebSockets"
  | "Python"
  | "FastAPI";

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  technologies: ProjectTag[];
  status: ProjectStatus;
  views: number;
  filterTags: FilterTag[];
  problem: string;
  solution: string;
  results: string[];
  liveUrl?: string;
  githubUrl?: string;
  gradient: string;
}

// ─── Filter ───────────────────────────────────────────────────────────────────

export type FilterTag = "React" | "Next.js" | "Node.js" | "NestJS" | "Fullstack";

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

// ─── Roadmap ──────────────────────────────────────────────────────────────────

export type SkillLevel = "mastered" | "learning" | "planned";

export interface Skill {
  name: string;
  level: SkillLevel;
  icon?: string;
}

// ─── View Counter ─────────────────────────────────────────────────────────────

export interface ViewRecord {
  projectId: string;
  count: number;
}
