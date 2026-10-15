import mongoose, { Schema, Document } from 'mongoose';

export interface ITimelineItem extends Document {
  title: string;
  subtitle?: string;
  date?: string;
  content?: string;
  order?: number;
  createdAt: Date;
}

const TimelineItemSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    subtitle: { type: String, default: '' },
    date: { type: String, default: '' },
    content: { type: String, default: '' },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.TimelineItem || mongoose.model<ITimelineItem>('TimelineItem', TimelineItemSchema);
