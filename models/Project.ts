import mongoose, { Schema, Document } from 'mongoose';

export interface IProject extends Document {
  title: string;
  description: string;
  image?: string;
  video?: string;
  technologies: string[];
  github?: string;
  githubUrl?: string;
  demo?: string;
  liveUrl?: string;
  figma?: string;
  longDescription?: string;
  problem?: string;
  solution?: string;
  results: string[];
  filterTags: string[];
  gradient?: string;
  views?: number;
  platform: string[];
  status: 'production' | 'in-progress' | 'idea';
  featured?: boolean;
  published?: boolean;
  createdAt: Date;
}

const ProjectSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: false, default: '' },
  video: { type: String, default: '' },
  technologies: [{ type: String, default: [] }],
  github: { type: String, default: '' },
  githubUrl: { type: String, default: '' },
  demo: { type: String, default: '' },
  liveUrl: { type: String, default: '' },
  figma: { type: String, default: '' },
  longDescription: { type: String, default: '' },
  problem: { type: String, default: '' },
  solution: { type: String, default: '' },
  results: [{ type: String }],
  filterTags: [{ type: String }],
  gradient: { type: String, default: '' },
  views: { type: Number, default: 0 },
  platform: [{ type: String, enum: ['web', 'ios', 'android'] }],
  status: { type: String, enum: ['production', 'in-progress', 'idea'], required: true },
  featured: { type: Boolean, default: false },
  published: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);