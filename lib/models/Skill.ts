import { model, models, Schema, type Model } from "mongoose";

export interface SkillDocument {
  name: string;
  level: "mastered" | "learning" | "planned";
  category: "hard" | "soft";
  icon?: string;
}

const SkillSchema = new Schema<SkillDocument>(
  {
    name: { type: String, required: true },
    level: {
      type: String,
      enum: ["mastered", "learning", "planned"],
      required: true,
    },
    category: {
      type: String,
      enum: ["hard", "soft"],
      required: true,
    },
    icon: { type: String },
  },
  { timestamps: true, versionKey: false }
);

const Skill =
  (models.Skill as Model<SkillDocument>) || model<SkillDocument>("Skill", SkillSchema);

export default Skill;
