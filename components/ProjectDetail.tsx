"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Eye,
  ExternalLink,
  CheckCircle2,
  Lightbulb,
  Wrench,
  BarChart3,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";
import clsx from "clsx";
import { Project } from "@/types";

const statusConfig = {
  production: { label: "Production", color: "text-emerald-400 border-emerald-400/30 bg-emerald-400/10", dot: "bg-emerald-400" },
  "in-progress": { label: "In Progress", color: "text-amber-400 border-amber-400/30 bg-amber-400/10", dot: "bg-amber-400" },
  paused: { label: "Paused", color: "text-muted border-border bg-surface", dot: "bg-muted" },
};

interface Props {
  project: Project;
}

export default function ProjectDetail({ project }: Props) {
  const [views, setViews] = useState(0);
  const status = statusConfig[project.status];

  useEffect(() => {
    // Increment + fetch view count
    fetch("/api/views", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ projectId: project.id }),
    })
      .then((r) => r.json())
      .then((d) => setViews(d.count ?? 0))
      .catch(() => {});
  }, [project.id]);

  return (
    <div className="min-h-screen bg-bg pt-24 pb-20 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Back */}
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary mb-10 group transition-colors"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to projects
        </Link>

        {/* Header card */}
        <div className={clsx("relative rounded-2xl glass border border-border overflow-hidden mb-8")}>
          <div className={clsx("h-1.5 w-full bg-gradient-to-r", project.gradient)} />
          <div className="p-8">
            <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
              <h1 className="text-3xl md:text-4xl font-bold text-text-primary">
                {project.title}
              </h1>
              <div className="flex items-center gap-3">
                <span
                  className={clsx(
                    "flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-medium",
                    status.color
                  )}
                >
                  <span className={clsx("w-1.5 h-1.5 rounded-full animate-pulse", status.dot)} />
                  {status.label}
                </span>
                <span className="flex items-center gap-1.5 text-xs text-muted">
                  <Eye size={13} />
                  {views.toLocaleString()}
                </span>
              </div>
            </div>

            <p className="text-text-secondary leading-relaxed mb-6">
              {project.longDescription}
            </p>

            {/* Links */}
            <div className="flex flex-wrap gap-3">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent text-white text-sm font-medium hover:bg-accent/90 transition-colors"
                >
                  <ExternalLink size={14} />
                  Live Site
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg glass border border-border text-text-secondary hover:text-text-primary text-sm font-medium transition-colors"
                >
                  <FaGithub size={14} />
                  Source Code
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Tech stack */}
        <div className="glass border border-border rounded-2xl p-6 mb-6">
          <h2 className="flex items-center gap-2 text-sm font-semibold text-text-primary mb-4">
            <Wrench size={15} className="text-accent" />
            Tech Stack
          </h2>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 text-sm rounded-lg bg-surface border border-border text-text-secondary font-mono"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Problem */}
        <div className="glass border border-border rounded-2xl p-6 mb-6">
          <h2 className="flex items-center gap-2 text-sm font-semibold text-text-primary mb-3">
            <Lightbulb size={15} className="text-amber-400" />
            The Problem
          </h2>
          <p className="text-text-secondary leading-relaxed">{project.problem}</p>
        </div>

        {/* Solution */}
        <div className="glass border border-border rounded-2xl p-6 mb-6">
          <h2 className="flex items-center gap-2 text-sm font-semibold text-text-primary mb-3">
            <Wrench size={15} className="text-accent" />
            The Solution
          </h2>
          <p className="text-text-secondary leading-relaxed">{project.solution}</p>
        </div>

        {/* Results */}
        <div className="glass border border-border rounded-2xl p-6">
          <h2 className="flex items-center gap-2 text-sm font-semibold text-text-primary mb-4">
            <BarChart3 size={15} className="text-emerald-400" />
            Results & Impact
          </h2>
          <ul className="space-y-3">
            {project.results.map((r, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircle2 size={16} className="text-emerald-400 mt-0.5 shrink-0" />
                <span className="text-text-secondary text-sm leading-relaxed">{r}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
