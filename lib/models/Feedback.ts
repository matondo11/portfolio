import { model, models, Schema, type Model } from "mongoose";
import type { FeedbackStatus } from "@/types";

export interface FeedbackDocument {
  name: string;
  rating: number;
  comment: string;
  role: string;
  status: FeedbackStatus;
  projectId?: string;
  createdAt: Date;
  updatedAt: Date;
}

const FeedbackSchema = new Schema<FeedbackDocument>(
  {
    name: { type: String, required: true, trim: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true, trim: true },
    role: { type: String, required: true, trim: true },
    status: {
      type: String,
      enum: ["approved", "pending", "rejected"],
      default: "pending",
      required: true,
    },
    projectId: { type: String, trim: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

FeedbackSchema.index({ status: 1, createdAt: -1 });

const Feedback =
  (models.Feedback as Model<FeedbackDocument>) ||
  model<FeedbackDocument>("Feedback", FeedbackSchema);

export default Feedback;
