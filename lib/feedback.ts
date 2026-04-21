import mongoose from "mongoose";
import {
  addFeedback as addFeedbackFallback,
  deleteFeedback as deleteFeedbackFallback,
  getAllFeedback as getAllFeedbackFallback,
  getApprovedFeedback as getApprovedFeedbackFallback,
  updateFeedbackStatus as updateFeedbackStatusFallback,
} from "@/lib/db";
import dbConnect, { isMongoConfigured } from "@/lib/mongodb";
import FeedbackModel, { type FeedbackDocument } from "@/lib/models/Feedback";
import type { Feedback, FeedbackInput, FeedbackStatus } from "@/types";

const feedbackSeed = [
  {
    name: "Maria Santos",
    rating: 5,
    comment:
      "Delivered the project ahead of schedule. The architecture was clean, easy to extend, and thoughtful from end to end.",
    role: "CTO at TechHub Angola",
    status: "approved" as const,
    createdAt: new Date("2024-11-15"),
  },
  {
    name: "Joao Ferreira",
    rating: 5,
    comment:
      "Strong full-stack execution and excellent communication. We always knew what was shipping and why.",
    role: "Founder at Emprego360",
    status: "approved" as const,
    createdAt: new Date("2024-12-03"),
  },
  {
    name: "Carla Mendes",
    rating: 4,
    comment:
      "Reliable, technically sharp, and easy to collaborate with during fast product iterations.",
    role: "Product Manager at Visa Express",
    status: "approved" as const,
    createdAt: new Date("2025-01-22"),
  },
];

let feedbackSeedPromise: Promise<void> | null = null;

function normalizeFeedback(
  feedback: FeedbackDocument & { _id?: mongoose.Types.ObjectId }
) {
  return {
    id: feedback._id?.toString() ?? "",
    name: feedback.name,
    rating: feedback.rating,
    comment: feedback.comment,
    role: feedback.role,
    status: feedback.status,
    projectId: feedback.projectId,
    createdAt: feedback.createdAt.toISOString(),
  } satisfies Feedback;
}

async function ensureFeedbackSeed() {
  if (!isMongoConfigured()) {
    return;
  }

  await dbConnect();

  const count = await FeedbackModel.estimatedDocumentCount();
  if (count > 0) {
    return;
  }

  if (!feedbackSeedPromise) {
    feedbackSeedPromise = FeedbackModel.insertMany(feedbackSeed, { ordered: false })
      .then(() => undefined)
      .catch((error: unknown) => {
        const isDuplicateKey =
          typeof error === "object" &&
          error !== null &&
          "code" in error &&
          (error as { code?: number }).code === 11000;

        if (!isDuplicateKey) {
          throw error;
        }
      })
      .finally(() => {
        feedbackSeedPromise = null;
      });
  }

  await feedbackSeedPromise;
}

export async function getFeedback(approvedOnly = false) {
  if (!isMongoConfigured()) {
    return approvedOnly
      ? getApprovedFeedbackFallback()
      : getAllFeedbackFallback();
  }

  await ensureFeedbackSeed();

  const query = approvedOnly ? { status: "approved" } : {};
  const feedback = await FeedbackModel.find(query).sort({ createdAt: -1 }).lean();

  return feedback.map((item) =>
    normalizeFeedback(item as FeedbackDocument & { _id?: mongoose.Types.ObjectId })
  );
}

export async function createFeedback(input: FeedbackInput) {
  if (!isMongoConfigured()) {
    return addFeedbackFallback(input);
  }

  await dbConnect();

  const feedback = await FeedbackModel.create({
    ...input,
    status: "pending",
  });

  return normalizeFeedback(feedback.toObject() as FeedbackDocument & { _id?: mongoose.Types.ObjectId });
}

export async function updateFeedbackStatus(
  feedbackId: string,
  status: Extract<FeedbackStatus, "approved" | "rejected">
) {
  if (!isMongoConfigured()) {
    return updateFeedbackStatusFallback(feedbackId, status);
  }

  await dbConnect();

  const feedback = await FeedbackModel.findByIdAndUpdate(
    feedbackId,
    { status },
    { new: true }
  ).lean();

  return feedback
    ? normalizeFeedback(feedback as FeedbackDocument & { _id?: mongoose.Types.ObjectId })
    : null;
}

export async function deleteFeedback(feedbackId: string) {
  if (!isMongoConfigured()) {
    return deleteFeedbackFallback(feedbackId);
  }

  await dbConnect();

  const deleted = await FeedbackModel.findByIdAndDelete(feedbackId);
  return Boolean(deleted);
}
