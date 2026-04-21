import { model, models, Schema, type Model } from "mongoose";

export interface ServiceDocument {
  title: string;
  description: string;
  icon?: string;
  category: string;
}

const ServiceSchema = new Schema<ServiceDocument>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String },
    category: { type: String, required: true },
  },
  { timestamps: true, versionKey: false }
);

const Service =
  (models.Service as Model<ServiceDocument>) ||
  model<ServiceDocument>("Service", ServiceSchema);

export default Service;
