import mongoose, { Schema, Document } from 'mongoose';

export interface IView extends Document {
  projectId: string;
  count: number;
}

const ViewSchema: Schema = new Schema({
  projectId: { type: String, required: true, unique: true },
  count: { type: Number, default: 0 },
});

export default mongoose.models.View || mongoose.model<IView>('View', ViewSchema);