import { model, models, Schema, type Model } from "mongoose";

export interface BioDocument {
  name: string;
  bio: string;
  photo: string;
  email: string;
  linkedin: string;
  github: string;
  twitter?: string;
  website?: string;
}

const BioSchema = new Schema<BioDocument>(
  {
    name: { type: String, required: true },
    bio: { type: String, required: true },
    photo: { type: String },
    email: { type: String, required: true },
    linkedin: { type: String },
    github: { type: String },
    twitter: { type: String },
    website: { type: String },
  },
  { timestamps: true, versionKey: false }
);

const Bio = (models.Bio as Model<BioDocument>) || model<BioDocument>("Bio", BioSchema);

export default Bio;
