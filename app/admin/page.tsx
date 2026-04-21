"use client";

import { useState } from "react";
import clsx from "clsx";
import { motion } from "framer-motion";
import {
  Check,
  FolderPlus,
  ImageUp,
  Lock,
  Settings,
  Trash2,
  X,
  Eye,
} from "lucide-react";
import type {
  Feedback,
  Project,
  ProjectCategory,
  ProjectMediaType,
  ProjectPlatform,
  ProjectStatus,
} from "@/types";

type AdminTab = "feedback" | "projects" | "settings";

type ProjectFormState = {
  name: string;
  slug: string;
  description: string;
  stack: string;
  tags: string;
  category: ProjectCategory;
  status: ProjectStatus;
  platforms: ProjectPlatform[];
  github: string;
  live: string;
  figma: string;
  learned: string;
  previewUrl: string;
  previewType: ProjectMediaType;
  previewAlt: string;
};

const INITIAL_PROJECT_FORM: ProjectFormState = {
  name: "",
  slug: "",
  description: "",
  stack: "",
  tags: "",
  category: "fullstack",
  status: "production",
  platforms: ["web"],
  github: "",
  live: "",
  figma: "",
  learned: "",
  previewUrl: "",
  previewType: "image",
  previewAlt: "",
};

const splitByComma = (value: string) =>
  value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

const splitByLine = (value: string) =>
  value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);

export default function AdminPage() {
  const [tab, setTab] = useState<AdminTab>("feedback");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploadingMedia, setUploadingMedia] = useState(false);
  const [savingProject, setSavingProject] = useState(false);
  const [error, setError] = useState("");
  const [projectMessage, setProjectMessage] = useState("");
  const [projectForm, setProjectForm] =
    useState<ProjectFormState>(INITIAL_PROJECT_FORM);

  const getAdminHeaders = (withJson = false) => ({
    ...(withJson ? { "Content-Type": "application/json" } : {}),
    "x-admin-key": password,
  });

  const loadFeedback = async () => {
    const res = await fetch("/api/feedback", {
      headers: getAdminHeaders(),
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to load feedback.");
    }

    const data = (await res.json()) as { feedback?: Feedback[] };
    setFeedback(data.feedback ?? []);
  };

  const loadProjects = async () => {
    const res = await fetch("/api/projects", { cache: "no-store" });

    if (!res.ok) {
      throw new Error("Failed to load projects.");
    }

    const data = (await res.json()) as { projects?: Project[] };
    setProjects(data.projects ?? []);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/verify", {
        headers: getAdminHeaders(),
      });

      if (!res.ok) {
        throw new Error("Invalid admin key");
      }

      setIsAuthenticated(true);
      await Promise.all([loadFeedback(), loadProjects()]);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (feedbackId: string) => {
    try {
      const res = await fetch("/api/feedback/manage", {
        method: "PATCH",
        headers: getAdminHeaders(true),
        body: JSON.stringify({ feedbackId, status: "approved" }),
      });

      if (!res.ok) {
        throw new Error("Failed to approve");
      }

      setFeedback((prev) =>
        prev.map((item) =>
          item.id === feedbackId ? { ...item, status: "approved" } : item
        )
      );
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to approve");
    }
  };

  const handleReject = async (feedbackId: string) => {
    try {
      const res = await fetch("/api/feedback/manage", {
        method: "PATCH",
        headers: getAdminHeaders(true),
        body: JSON.stringify({ feedbackId, status: "rejected" }),
      });

      if (!res.ok) {
        throw new Error("Failed to reject");
      }

      setFeedback((prev) =>
        prev.map((item) =>
          item.id === feedbackId ? { ...item, status: "rejected" } : item
        )
      );
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to reject");
    }
  };

  const handleDelete = async (feedbackId: string) => {
    if (!confirm("Delete this feedback?")) {
      return;
    }

    try {
      const res = await fetch("/api/feedback/manage", {
        method: "DELETE",
        headers: getAdminHeaders(true),
        body: JSON.stringify({ feedbackId }),
      });

      if (!res.ok) {
        throw new Error("Failed to delete");
      }

      setFeedback((prev) => prev.filter((item) => item.id !== feedbackId));
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to delete");
    }
  };

  const togglePlatform = (platform: ProjectPlatform) => {
    setProjectForm((prev) => ({
      ...prev,
      platforms: prev.platforms.includes(platform)
        ? prev.platforms.filter((item) => item !== platform)
        : [...prev.platforms, platform],
    }));
  };

  const handleProjectInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setProjectForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleMediaUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    setError("");
    setProjectMessage("");
    setUploadingMedia(true);

    try {
      const formData = new FormData();
      formData.set("file", file);
      formData.set("folder", "portfolio/projects");

      const res = await fetch("/api/upload", {
        method: "POST",
        headers: getAdminHeaders(),
        body: formData,
      });

      const data = (await res.json()) as {
        error?: string;
        url?: string;
        resourceType?: ProjectMediaType;
      };

      if (!res.ok || !data.url || !data.resourceType) {
        throw new Error(data.error ?? "Failed to upload media.");
      }

      setProjectForm((prev) => ({
        ...prev,
        previewUrl: data.url!,
        previewType: data.resourceType!,
        previewAlt: prev.previewAlt || `${prev.name || file.name} preview`,
      }));
      setProjectMessage("Media uploaded to Cloudinary.");
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to upload media.");
    } finally {
      setUploadingMedia(false);
      e.target.value = "";
    }
  };

  const handleProjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setProjectMessage("");

    if (!projectForm.previewUrl) {
      setError("Upload a project image or video before saving.");
      return;
    }

    setSavingProject(true);

    try {
      const payload = {
        slug: projectForm.slug,
        name: projectForm.name,
        description: projectForm.description,
        stack: splitByComma(projectForm.stack),
        tags: splitByComma(projectForm.tags),
        category: projectForm.category,
        status: projectForm.status,
        platforms: projectForm.platforms,
        links: {
          github: projectForm.github,
          live: projectForm.live,
          figma: projectForm.figma,
        },
        preview: {
          url: projectForm.previewUrl,
          type: projectForm.previewType,
          alt: projectForm.previewAlt || `${projectForm.name} preview`,
        },
        learned: splitByLine(projectForm.learned),
      };

      const res = await fetch("/api/projects", {
        method: "POST",
        headers: getAdminHeaders(true),
        body: JSON.stringify(payload),
      });

      const data = (await res.json()) as { error?: string; project?: Project };

      if (!res.ok || !data.project) {
        throw new Error(data.error ?? "Failed to create project.");
      }

      setProjects((prev) => [data.project!, ...prev]);
      setProjectForm(INITIAL_PROJECT_FORM);
      setProjectMessage("Project saved to MongoDB.");
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to create project.");
    } finally {
      setSavingProject(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="rounded-lg border border-border p-8 glass">
            <div className="mb-6 flex items-center justify-center gap-2">
              <Lock className="text-accent" size={24} />
              <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium">Admin Key</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin key"
                  className="w-full rounded-lg border border-border bg-surface px-4 py-2 text-text-primary transition-colors focus:border-accent focus:outline-none"
                />
              </div>

              {error && (
                <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-accent px-4 py-2 font-medium text-bg transition-colors hover:bg-accent/90 disabled:opacity-60"
              >
                {loading ? "Checking..." : "Login"}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg px-4 py-8 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto max-w-6xl"
      >
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-text-secondary">
              Manage MongoDB-backed content and Cloudinary media.
            </p>
          </div>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="rounded-lg border border-border bg-surface px-4 py-2 text-text-primary transition-colors hover:bg-surface/80"
          >
            Logout
          </button>
        </div>

        <div className="mb-8 flex gap-2 border-b border-border">
          {[
            {
              value: "feedback" as const,
              label: `Feedback (${feedback.filter((item) => item.status === "pending").length} pending)`,
            },
            { value: "projects" as const, label: "Projects" },
            { value: "settings" as const, label: "Settings" },
          ].map((item) => (
            <button
              key={item.value}
              onClick={() => setTab(item.value)}
              className={clsx(
                "border-b-2 px-4 py-2 font-medium transition-colors -mb-[2px]",
                tab === item.value
                  ? "border-accent text-accent"
                  : "border-transparent text-text-secondary hover:text-text-primary"
              )}
            >
              {item.label}
            </button>
          ))}
        </div>

        {error && (
          <div className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-red-400">
            {error}
          </div>
        )}

        {tab === "feedback" && (
          <div className="grid gap-4">
            {feedback.length === 0 ? (
              <div className="py-12 text-center text-text-secondary">
                No feedback submissions yet.
              </div>
            ) : (
              feedback.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="rounded-lg border border-border p-6 glass transition-colors hover:border-accent/40"
                >
                  <div className="mb-4 flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-text-primary">{item.name}</h3>
                      <p className="text-sm text-text-secondary">{item.role}</p>
                    </div>
                    <span
                      className={clsx(
                        "rounded-full px-3 py-1 text-xs font-medium",
                        item.status === "approved"
                          ? "bg-green-500/20 text-green-400"
                          : item.status === "pending"
                            ? "bg-yellow-500/20 text-yellow-400"
                            : "bg-red-500/20 text-red-400"
                      )}
                    >
                      {item.status}
                    </span>
                  </div>

                  <p className="mb-4 text-text-secondary">{item.comment}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((value) => (
                        <div
                          key={value}
                          className={clsx(
                            "h-4 w-4 rounded-full",
                            value <= item.rating ? "bg-amber-400" : "bg-surface"
                          )}
                        />
                      ))}
                    </div>

                    <div className="flex items-center gap-2">
                      {item.status === "pending" && (
                        <>
                          <button
                            onClick={() => handleApprove(item.id)}
                            className="rounded-lg bg-green-500/20 p-2 text-green-400 transition-colors hover:bg-green-500/30"
                            title="Approve"
                          >
                            <Check size={18} />
                          </button>
                          <button
                            onClick={() => handleReject(item.id)}
                            className="rounded-lg bg-red-500/20 p-2 text-red-400 transition-colors hover:bg-red-500/30"
                            title="Reject"
                          >
                            <X size={18} />
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="rounded-lg bg-red-500/20 p-2 text-red-400 transition-colors hover:bg-red-500/30"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        )}

        {tab === "projects" && (
          <div className="grid gap-8 xl:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)]">
            <form
              onSubmit={handleProjectSubmit}
              className="space-y-5 rounded-2xl border border-border p-6 glass"
            >
              <div className="flex items-center gap-2">
                <FolderPlus className="text-accent" size={22} />
                <h2 className="text-xl font-semibold">Create Project</h2>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <input
                  name="name"
                  value={projectForm.name}
                  onChange={handleProjectInputChange}
                  placeholder="Project name"
                  className="rounded-xl border border-border bg-surface px-4 py-3 text-sm text-text-primary focus:border-accent/50 focus:outline-none"
                />
                <input
                  name="slug"
                  value={projectForm.slug}
                  onChange={handleProjectInputChange}
                  placeholder="Optional slug"
                  className="rounded-xl border border-border bg-surface px-4 py-3 text-sm text-text-primary focus:border-accent/50 focus:outline-none"
                />
              </div>

              <textarea
                name="description"
                rows={4}
                value={projectForm.description}
                onChange={handleProjectInputChange}
                placeholder="Describe the project in a strong, production-focused way."
                className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-text-primary focus:border-accent/50 focus:outline-none"
              />

              <div className="grid gap-4 md:grid-cols-2">
                <input
                  name="stack"
                  value={projectForm.stack}
                  onChange={handleProjectInputChange}
                  placeholder="Stack, separated by commas"
                  className="rounded-xl border border-border bg-surface px-4 py-3 text-sm text-text-primary focus:border-accent/50 focus:outline-none"
                />
                <input
                  name="tags"
                  value={projectForm.tags}
                  onChange={handleProjectInputChange}
                  placeholder="Tags, separated by commas"
                  className="rounded-xl border border-border bg-surface px-4 py-3 text-sm text-text-primary focus:border-accent/50 focus:outline-none"
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <select
                  name="category"
                  value={projectForm.category}
                  onChange={handleProjectInputChange}
                  className="rounded-xl border border-border bg-surface px-4 py-3 text-sm text-text-primary focus:border-accent/50 focus:outline-none"
                >
                  <option value="fullstack">Fullstack</option>
                  <option value="frontend">Frontend</option>
                  <option value="backend">Backend</option>
                  <option value="mobile">Mobile</option>
                  <option value="tools">Tools</option>
                </select>

                <select
                  name="status"
                  value={projectForm.status}
                  onChange={handleProjectInputChange}
                  className="rounded-xl border border-border bg-surface px-4 py-3 text-sm text-text-primary focus:border-accent/50 focus:outline-none"
                >
                  <option value="production">Production</option>
                  <option value="progress">In Progress</option>
                  <option value="planned">Planned</option>
                </select>
              </div>

              <div>
                <p className="mb-3 text-sm font-medium text-text-primary">
                  Supported platforms
                </p>
                <div className="flex flex-wrap gap-2">
                  {(["web", "android", "ios"] as ProjectPlatform[]).map((platform) => (
                    <button
                      key={platform}
                      type="button"
                      onClick={() => togglePlatform(platform)}
                      className={clsx(
                        "rounded-full border px-4 py-2 text-sm transition-colors",
                        projectForm.platforms.includes(platform)
                          ? "border-accent bg-accent text-white"
                          : "border-border text-text-secondary hover:text-text-primary"
                      )}
                    >
                      {platform}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <input
                  name="github"
                  value={projectForm.github}
                  onChange={handleProjectInputChange}
                  placeholder="GitHub URL"
                  className="rounded-xl border border-border bg-surface px-4 py-3 text-sm text-text-primary focus:border-accent/50 focus:outline-none"
                />
                <input
                  name="live"
                  value={projectForm.live}
                  onChange={handleProjectInputChange}
                  placeholder="Live demo URL"
                  className="rounded-xl border border-border bg-surface px-4 py-3 text-sm text-text-primary focus:border-accent/50 focus:outline-none"
                />
                <input
                  name="figma"
                  value={projectForm.figma}
                  onChange={handleProjectInputChange}
                  placeholder="Figma URL"
                  className="rounded-xl border border-border bg-surface px-4 py-3 text-sm text-text-primary focus:border-accent/50 focus:outline-none"
                />
              </div>

              <textarea
                name="learned"
                rows={4}
                value={projectForm.learned}
                onChange={handleProjectInputChange}
                placeholder="One learning outcome per line"
                className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-text-primary focus:border-accent/50 focus:outline-none"
              />

              <div className="rounded-xl border border-dashed border-border p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="font-medium text-text-primary">
                      Upload project media
                    </p>
                    <p className="text-sm text-text-secondary">
                      Images and videos are stored in Cloudinary, and only the secure URL is saved in MongoDB.
                    </p>
                  </div>
                  <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-accent/30 px-4 py-2 text-sm font-medium text-accent transition-colors hover:bg-accent/10">
                    <ImageUp size={16} />
                    {uploadingMedia ? "Uploading..." : "Upload"}
                    <input
                      type="file"
                      accept="image/*,video/*"
                      onChange={handleMediaUpload}
                      className="hidden"
                    />
                  </label>
                </div>

                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  <input
                    name="previewAlt"
                    value={projectForm.previewAlt}
                    onChange={handleProjectInputChange}
                    placeholder="Accessible alt text for the preview"
                    className="rounded-xl border border-border bg-surface px-4 py-3 text-sm text-text-primary focus:border-accent/50 focus:outline-none"
                  />
                  <input
                    value={projectForm.previewUrl}
                    readOnly
                    placeholder="Uploaded media URL will appear here"
                    className="rounded-xl border border-border bg-surface px-4 py-3 text-sm text-text-secondary"
                  />
                </div>
              </div>

              {projectMessage && (
                <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-3 text-sm text-emerald-400">
                  {projectMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={savingProject}
                className="w-full rounded-xl bg-accent px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-accent/90 disabled:opacity-60"
              >
                {savingProject ? "Saving project..." : "Create project"}
              </button>
            </form>

            <div className="space-y-4">
              <div className="rounded-2xl border border-border p-6 glass">
                <div className="mb-4 flex items-center gap-2">
                  <Eye className="text-accent" size={18} />
                  <h3 className="text-lg font-semibold">Recent Projects</h3>
                </div>

                <div className="space-y-3">
                  {projects.slice(0, 6).map((project) => (
                    <div
                      key={project.id}
                      className="rounded-xl border border-border bg-bg/60 p-4"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="font-medium text-text-primary">{project.title}</p>
                          <p className="mt-1 text-xs uppercase tracking-[0.18em] text-muted">
                            {project.category} · {project.status}
                          </p>
                        </div>
                        <span className="text-sm text-accent">
                          {project.views.toLocaleString()} views
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {tab === "settings" && (
          <div className="rounded-lg border border-border p-6 glass">
            <div className="mb-6 flex items-center gap-2">
              <Settings className="text-accent" size={24} />
              <h2 className="text-xl font-semibold">Production Notes</h2>
            </div>
            <ul className="space-y-3 text-sm text-text-secondary">
              <li>Project media uploads are restricted to authenticated admin requests.</li>
              <li>Projects, feedback, and view counters now persist in MongoDB Atlas.</li>
              <li>Cloudinary delivery URLs are optimized at render time for lighter project previews.</li>
              <li>Use `.env.example` as the template for production environment variables.</li>
            </ul>
          </div>
        )}
      </motion.div>
    </div>
  );
}
