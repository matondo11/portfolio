import { model, models, Schema, type Model } from "mongoose";

export interface PhotoDocument {
  title: string;
  description?: string;
  url: string;
  alt: string;
  category: string;
}

const PhotoSchema = new Schema<PhotoDocument>(
  {
    title: { type: String, required: true },
    description: { type: String },
    url: { type: String, required: true },
    alt: { type: String, required: true },
    category: { type: String, required: true },
  },
  { timestamps: true, versionKey: false }
);

const Photo =
  (models.Photo as Model<PhotoDocument>) || model<PhotoDocument>("Photo", PhotoSchema);

export default Photo;
