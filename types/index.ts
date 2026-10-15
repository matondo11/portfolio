// ─── Project ──────────────────────────────────────────────────────────────────

export type ProjectStatus = "production" | "in-progress" | "idea";

export type Platform = "web" | "ios" | "android";
export type FilterTag = string;

export interface Skill {
  _id?: string;
  name: string;
  level: "mastered" | "learning" | "planned";
  proficiency?: number;
  createdAt?: string | Date;
}

export interface Service {
  _id?: string;
  title: string;
  description: string;
  icon: string;
  createdAt?: string | Date;
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
  published?: boolean;
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

export interface Profile {
  photo: string;
  banner: string;
  name: string;
  role: string;
  summary: string;
  about: string;
  location: string;
  availability: string;
  email: string;
  whatsapp: string;
  resumeUrl: string;
  socialLinks: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    website?: string;
  };
}

export interface TimelineItem {
  _id?: string;
  category: 'experience' | 'education';
  title: string;
  subtitle?: string;
  date?: string;
  content?: string;
  order?: number;
  createdAt?: string | Date;
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
  approved?: boolean;
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