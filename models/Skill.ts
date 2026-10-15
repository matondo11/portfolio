import mongoose, { Schema, Document } from 'mongoose';

export interface ISkill extends Document {
  name: string;
  level: 'mastered' | 'learning' | 'planned';
  createdAt: Date;
}

const SkillSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    level: {
      type: String,
      enum: ['mastered', 'learning', 'planned'],
      required: true,
    },
    createdAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Skill || mongoose.model<ISkill>('Skill', SkillSchema);
