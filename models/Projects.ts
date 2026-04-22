import mongoose, { Schema, Document } from 'mongoose';

export interface IProject extends Document {
  title: string;
  description: string;
  image: string;
  video?: string;
  technologies: string[];
  github?: string;
  demo?: string;
  figma?: string;
  platform: string[];
  status: 'production' | 'in-progress' | 'idea';
  featured?: boolean;
  createdAt: Date;
}

const ProjectSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  video: { type: String },
  technologies: [{ type: String }],
  github: { type: String },
  demo: { type: String },
  figma: { type: String },
  platform: [{ type: String, enum: ['web', 'ios', 'android'] }],
  status: { type: String, enum: ['production', 'in-progress', 'idea'], required: true },
  featured: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);