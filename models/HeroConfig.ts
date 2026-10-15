import mongoose, { Schema, Document } from 'mongoose';

export interface IHeroConfig extends Document {
  headline: string;
  subheadline?: string;
  ctaText?: string;
  ctaUrl?: string;
  backgroundImage?: string;
  image?: string;
  enabled?: boolean;
  createdAt: Date;
}

const HeroConfigSchema: Schema = new Schema(
  {
    headline: { type: String, default: '' },
    subheadline: { type: String, default: '' },
    ctaText: { type: String, default: '' },
    ctaUrl: { type: String, default: '' },
    backgroundImage: { type: String, default: '' },
    image: { type: String, default: '' },
    enabled: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.HeroConfig || mongoose.model<IHeroConfig>('HeroConfig', HeroConfigSchema);
