/**
 * Mock in-memory store.
 * Replace `viewStore` and `feedbackStore` with real DB calls
 * (e.g. Prisma, Drizzle, Supabase) without touching API routes.
 */

import { Feedback, FeedbackInput, ViewRecord } from "@/types";
import { randomUUID } from "crypto";

// ─── View Store ───────────────────────────────────────────────────────────────

const viewStore = new Map<string, number>();

export function getViews(projectId: string): number {
  return viewStore.get(projectId) ?? 0;
}

export function incrementViews(projectId: string): number {
  const current = viewStore.get(projectId) ?? 0;
  const next = current + 1;
  viewStore.set(projectId, next);
  return next;
}

export function getAllViews(): ViewRecord[] {
  return Array.from(viewStore.entries()).map(([projectId, count]) => ({
    projectId,
    count,
  }));
}

// ─── Feedback Store ───────────────────────────────────────────────────────────

const feedbackStore: Feedback[] = [
  {
    id: "seed-1",
    name: "Maria Santos",
    rating: 5,
    comment:
      "Delivered the project ahead of schedule. The code quality was exceptional — clean architecture, well-documented, and easy to extend.",
    role: "CTO at TechHub Angola",
    createdAt: new Date("2024-11-15").toISOString(),
  },
  {
    id: "seed-2",
    name: "João Ferreira",
    rating: 5,
    comment:
      "Outstanding full-stack work. The system handles thousands of concurrent users without breaking a sweat.",
    role: "Founder at Emprego360",
    createdAt: new Date("2024-12-03").toISOString(),
  },
  {
    id: "seed-3",
    name: "Carla Mendes",
    rating: 4,
    comment:
      "Professional, communicative, and technically strong. Would hire again for our next product cycle.",
    role: "Product Manager at Visa Express",
    createdAt: new Date("2025-01-22").toISOString(),
  },
];

export function getAllFeedback(): Feedback[] {
  return [...feedbackStore].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export function addFeedback(input: FeedbackInput): Feedback {
  const entry: Feedback = {
    id: randomUUID(),
    ...input,
    createdAt: new Date().toISOString(),
  };
  feedbackStore.push(entry);
  return entry;
}
