import {
  ContactInput,
  ContactMessage,
  Feedback,
  FeedbackInput,
  ViewRecord,
} from "@/types";
import { randomUUID } from "crypto";
import { promises as fs } from "fs";
import path from "path";

const RUNTIME_DIR = path.join(process.cwd(), "data", "runtime");
const FEEDBACK_FILE = path.join(RUNTIME_DIR, "feedback.json");
const VIEWS_FILE = path.join(RUNTIME_DIR, "views.json");
const CONTACT_FILE = path.join(RUNTIME_DIR, "contact-messages.json");

const feedbackSeed: Feedback[] = [
  {
    id: "seed-1",
    name: "Maria Santos",
    rating: 5,
    comment:
      "Delivered the project ahead of schedule. The code quality was exceptional — clean architecture, well-documented, and easy to extend.",
    role: "CTO at TechHub Angola",
    status: "approved",
    createdAt: new Date("2024-11-15").toISOString(),
  },
  {
    id: "seed-2",
    name: "João Ferreira",
    rating: 5,
    comment:
      "Outstanding full-stack work. The system handles thousands of concurrent users without breaking a sweat.",
    role: "Founder at Emprego360",
    status: "approved",
    createdAt: new Date("2024-12-03").toISOString(),
  },
  {
    id: "seed-3",
    name: "Carla Mendes",
    rating: 4,
    comment:
      "Professional, communicative, and technically strong. Would hire again for our next product cycle.",
    role: "Product Manager at Visa Express",
    status: "approved",
    createdAt: new Date("2025-01-22").toISOString(),
  },
];

type ViewStore = Record<string, number>;

let writeQueue = Promise.resolve();

function queueWrite<T>(task: () => Promise<T>): Promise<T> {
  const next = writeQueue.then(task, task);
  writeQueue = next.then(
    () => undefined,
    () => undefined
  );
  return next;
}

async function ensureRuntimeDir() {
  await fs.mkdir(RUNTIME_DIR, { recursive: true });
}

async function readJson<T>(filePath: string, fallback: T): Promise<T> {
  try {
    const raw = await fs.readFile(filePath, "utf8");
    return JSON.parse(raw) as T;
  } catch (error) {
    const isMissing =
      error instanceof Error &&
      "code" in error &&
      (error as NodeJS.ErrnoException).code === "ENOENT";

    if (isMissing) {
      return fallback;
    }

    throw error;
  }
}

async function writeJson<T>(filePath: string, value: T) {
  await ensureRuntimeDir();
  await fs.writeFile(filePath, JSON.stringify(value, null, 2), "utf8");
}

export async function getViews(projectId: string): Promise<number> {
  const store = await readJson<ViewStore>(VIEWS_FILE, {});
  return store[projectId] ?? 0;
}

export async function incrementViews(projectId: string): Promise<number> {
  return queueWrite(async () => {
    const store = await readJson<ViewStore>(VIEWS_FILE, {});
    const next = (store[projectId] ?? 0) + 1;
    store[projectId] = next;
    await writeJson(VIEWS_FILE, store);
    return next;
  });
}

export async function getAllViews(): Promise<ViewRecord[]> {
  const store = await readJson<ViewStore>(VIEWS_FILE, {});
  return Object.entries(store).map(([projectId, count]) => ({ projectId, count }));
}

export async function getAllFeedback(): Promise<Feedback[]> {
  const feedbackStore = await readJson<Feedback[]>(FEEDBACK_FILE, feedbackSeed);
  return [...feedbackStore].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export async function getApprovedFeedback(): Promise<Feedback[]> {
  const feedbackStore = await readJson<Feedback[]>(FEEDBACK_FILE, feedbackSeed);
  return feedbackStore
    .filter((f) => f.status === "approved")
    .sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
}

export async function updateFeedbackStatus(
  feedbackId: string,
  status: "approved" | "rejected"
): Promise<Feedback | null> {
  return queueWrite(async () => {
    const feedbackStore = await readJson<Feedback[]>(FEEDBACK_FILE, feedbackSeed);
    const index = feedbackStore.findIndex((f) => f.id === feedbackId);
    if (index === -1) return null;

    feedbackStore[index].status = status;
    await writeJson(FEEDBACK_FILE, feedbackStore);
    return feedbackStore[index];
  });
}

export async function deleteFeedback(feedbackId: string): Promise<boolean> {
  return queueWrite(async () => {
    const feedbackStore = await readJson<Feedback[]>(FEEDBACK_FILE, feedbackSeed);
    const index = feedbackStore.findIndex((f) => f.id === feedbackId);
    if (index === -1) return false;

    feedbackStore.splice(index, 1);
    await writeJson(FEEDBACK_FILE, feedbackStore);
    return true;
  });
}

export async function addFeedback(input: FeedbackInput): Promise<Feedback> {
  return queueWrite(async () => {
    const feedbackStore = await readJson<Feedback[]>(FEEDBACK_FILE, feedbackSeed);
    const entry: Feedback = {
      id: randomUUID(),
      ...input,
      status: "pending",
      createdAt: new Date().toISOString(),
    };
    feedbackStore.push(entry);
    await writeJson(FEEDBACK_FILE, feedbackStore);
    return entry;
  });
}

export async function addContactMessage(
  input: ContactInput
): Promise<ContactMessage> {
  return queueWrite(async () => {
    const messages = await readJson<ContactMessage[]>(CONTACT_FILE, []);
    const entry: ContactMessage = {
      id: randomUUID(),
      ...input,
      createdAt: new Date().toISOString(),
    };
    messages.push(entry);
    await writeJson(CONTACT_FILE, messages);
    return entry;
  });
}
