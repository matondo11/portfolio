import mongoose from 'mongoose';
import Feedback from '@/models/Feedback';
import View from '@/models/View';
import { FeedbackInput } from '@/types';

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

// Feedback functions
export async function getAllFeedback() {
  await dbConnect();
  const feedback = await Feedback.find().sort({ createdAt: -1 });
  return feedback.map(f => ({
    id: f._id.toString(),
    name: f.name,
    rating: f.rating,
    comment: f.comment,
    role: f.role,
    createdAt: f.createdAt.toISOString(),
  }));
}

export async function addFeedback(data: FeedbackInput) {
  await dbConnect();
  const feedback = new Feedback(data);
  await feedback.save();
  return {
    id: feedback._id.toString(),
    name: feedback.name,
    rating: feedback.rating,
    comment: feedback.comment,
    role: feedback.role,
    createdAt: feedback.createdAt.toISOString(),
  };
}

// View functions
export async function incrementViews(projectId: string) {
  await dbConnect();
  const view = await View.findOneAndUpdate(
    { projectId },
    { $inc: { count: 1 } },
    { new: true, upsert: true }
  );
  return view.count;
}

export async function getViews(projectId: string) {
  await dbConnect();
  const view = await View.findOne({ projectId });
  return view ? view.count : 0;
}

export async function getAllViews() {
  await dbConnect();
  const views = await View.find();
  return views.map(v => ({
    projectId: v.projectId,
    count: v.count,
  }));
}

export default dbConnect;