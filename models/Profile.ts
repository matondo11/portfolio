import mongoose, { Schema, Document } from 'mongoose';

export interface IProfile extends Document {
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
  createdAt: Date;
  updatedAt: Date;
}

const ProfileSchema: Schema = new Schema(
  {
    photo: { type: String, default: '' },
    banner: { type: String, default: '' },
    name: { type: String, default: '' },
    role: { type: String, default: '' },
    summary: { type: String, default: '' },
    about: { type: String, default: '' },
    location: { type: String, default: '' },
    availability: { type: String, default: '' },
    email: { type: String, default: '' },
    whatsapp: { type: String, default: '' },
    resumeUrl: { type: String, default: '' },
    socialLinks: {
      github: { type: String, default: '' },
      linkedin: { type: String, default: '' },
      twitter: { type: String, default: '' },
      website: { type: String, default: '' },
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Profile || mongoose.model<IProfile>('Profile', ProfileSchema);
