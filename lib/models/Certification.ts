import { model, models, Schema, type Model } from "mongoose";

export interface CertificationDocument {
  title: string;
  issuer: string;
  date: Date;
  url?: string;
  description?: string;
}

const CertificationSchema = new Schema<CertificationDocument>(
  {
    title: { type: String, required: true },
    issuer: { type: String, required: true },
    date: { type: Date, required: true },
    url: { type: String },
    description: { type: String },
  },
  { timestamps: true, versionKey: false }
);

const Certification =
  (models.Certification as Model<CertificationDocument>) ||
  model<CertificationDocument>("Certification", CertificationSchema);

export default Certification;
