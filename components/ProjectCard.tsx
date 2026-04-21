"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Eye, ArrowUpRight, Circle } from "lucide-react";
import clsx from "clsx";
import { Project } from "@/types";

const statusConfig = {
  production: { label: "Production", color: "text-emerald-400", dot: "bg-emerald-400" },
  "in-progress": { label: "In Progress", color: "text-amber-400", dot: "bg-amber-400" },
  paused: { label: "Paused", color: "text-muted", dot: "bg-muted" },
};

interface Props {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: Props) {
  const [views, setViews] = useState(project.views);
  const status = statusConfig[project.status];

  useEffect(() => {
    // Fetch current view count on mount
    fetch(`/api/views?projectId=${project.id}`)
      .then((r) => r.json())
      .then((d) => setViews(d.count ?? 0))
      .catch(() => {});
  }, [project.id]);

  return (
    <Link
      href={`/projects/${project.id}`}
      className="group relative flex flex-col rounded-2xl glass border border-border overflow-hidden hover:border-accent/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-glow animate-fade-up"
      style={{ animationDelay: `${index * 0.08}s` }}
    >
      {/* Gradient top accent */}
      <div className={clsx("h-1 w-full bg-gradient-to-r", project.gradient)} />

      {/* Card glow on hover */}
      <div
        className={clsx(
          "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none",
          project.gradient
        )}
      />

      <div className="relative z-10 p-6 flex flex-col gap-4 h-full">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-semibold text-text-primary group-hover:text-white transition-colors">
            {project.title}
          </h3>
          <ArrowUpRight
            size={18}
            className="text-muted group-hover:text-accent transition-colors shrink-0 mt-0.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200"
          />
        </div>

        {/* Description */}
        <p className="text-sm text-text-secondary leading-relaxed flex-1">
          {project.description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-1.5">
          {project.technologies.slice(0, 5).map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 text-xs rounded-md bg-surface border border-border/60 text-text-secondary font-mono"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 5 && (
            <span className="px-2.5 py-1 text-xs rounded-md bg-surface border border-border/60 text-muted font-mono">
              +{project.technologies.length - 5}
            </span>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-border/60">
          <div className="flex items-center gap-1.5">
            <span className={clsx("w-1.5 h-1.5 rounded-full animate-pulse", status.dot)} />
            <span className={clsx("text-xs font-medium", status.color)}>{status.label}</span>
          </div>
          <div className="flex items-center gap-1.5 text-muted text-xs">
            <Eye size={13} />
            <span>{views.toLocaleString()} views</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
