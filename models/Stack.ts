import mongoose, { Schema, Document } from 'mongoose';

export interface IStack extends Document {
  name: string;
  category?: string;
  description?: string;
  icon?: string;
  order?: number;
  createdAt: Date;
}

const StackSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    category: { type: String, default: '' },
    description: { type: String, default: '' },
    icon: { type: String, default: '' },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.Stack || mongoose.model<IStack>('Stack', StackSchema);
