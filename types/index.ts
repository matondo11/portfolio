export type ProjectStatus = "production" | "progress" | "planned";
export type ProjectCategory = "frontend" | "backend" | "fullstack" | "mobile" | "tools";
export type ProjectTechnologyFilter = "all" | ProjectCategory;
export type ProjectStatusFilter = "all" | ProjectStatus;
export type ProjectFilterValue = "all" | "production" | ProjectCategory;
export type ProjectPlatform = "web" | "android" | "ios";
export type ProjectMediaType = "image" | "video";
export type FeedbackStatus = "approved" | "pending" | "rejected";
export type SkillLevel = "mastered" | "learning" | "planned";
export type SkillCategory = "hard" | "soft";

export interface Skill {
  name: string;
  level: SkillLevel;
  icon?: string;
}

export interface ProjectLinks {
  github?: string;
  live?: string;
  figma?: string;
}

export interface ProjectPreview {
  url: string;
  type: ProjectMediaType;
  alt: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  image: string;
  video?: string;
  status: ProjectStatus;
  technologies: string[];
  platforms: ProjectPlatform[];
  github?: string;
  live?: string;
  figma?: string;
  views: number;
  category: ProjectCategory;
  learned?: string[];
  experienceYears?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProjectInput {
  slug?: string;
  title: string;
  description: string;
  image: string;
  video?: string;
  status: ProjectStatus;
  technologies: string[];
  platforms: ProjectPlatform[];
  github?: string;
  live?: string;
  figma?: string;
  views?: number;
  category: ProjectCategory;
  learned?: string[];
  experienceYears?: number;
}

export interface ViewRecord {
  projectId: string;
  count: number;
}

export interface Feedback {
  id: string;
  name: string;
  rating: number;
  comment: string;
  role: string;
  status: FeedbackStatus;
  projectId?: string;
  createdAt: string;
}

export interface FeedbackInput {
  name: string;
  rating: number;
  comment: string;
  role: string;
  projectId?: string;
}

export interface ContactInput {
  name: string;
  email: string;
  message: string;
}

export interface ContactMessage extends ContactInput {
  id: string;
  createdAt: string;
}

export interface IProject extends Project {
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export interface IBio {
  _id: string;
  name: string;
  bio: string;
  photo: string;
  email: string;
  linkedin: string;
  github: string;
  twitter?: string;
  website?: string;
  createdAt: string;
  updatedAt: string;
}

export interface IPhoto {
  _id: string;
  title: string;
  description?: string;
  url: string;
  alt: string;
  category: string;
  createdAt: string;
  updatedAt: string;
}

export interface ICertification {
  _id: string;
  title: string;
  issuer: string;
  date: string;
  url?: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface IService {
  _id: string;
  title: string;
  description: string;
  icon?: string;
  category: string;
  createdAt: string;
  updatedAt: string;
}

export interface ISkill {
  _id: string;
  name: string;
  level: SkillLevel;
  category: SkillCategory;
  icon?: string;
  createdAt: string;
  updatedAt: string;
}
