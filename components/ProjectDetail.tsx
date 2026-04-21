"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import {
  ArrowLeft,
  Code2,
  Eye,
  ExternalLink,
  Lightbulb,
  MonitorSmartphone,
} from "lucide-react";
import { FaAndroid, FaApple, FaFigma, FaGithub } from "react-icons/fa";
import Card from "@/components/Card";
import ProjectMedia from "@/components/ProjectMedia";
import type { Project } from "@/types";

const statusConfig = {
  production: {
    label: "Production",
    color: "border-emerald-400/30 bg-emerald-400/10 text-emerald-300",
  },
  progress: {
    label: "In Progress",
    color: "border-amber-400/30 bg-amber-400/10 text-amber-300",
  },
  planned: {
    label: "Planned",
    color: "border-border bg-surface text-muted",
  },
};

const platformIcons = {
  web: { label: "Web", icon: MonitorSmartphone },
  android: { label: "Android", icon: FaAndroid },
  ios: { label: "iOS", icon: FaApple },
};

interface ProjectDetailProps {
  project: Project;
}

export default function ProjectDetail({ project }: ProjectDetailProps) {
  const [views, setViews] = useState(project.views);

  useEffect(() => {
    const controller = new AbortController();

    async function registerView() {
      try {
        const res = await fetch(`/api/projects/${project.id}/view`, {
          method: "POST",
          signal: controller.signal,
        });

        if (!res.ok) {
          return;
        }

        const data = (await res.json()) as { views?: number };
        setViews(data.views ?? project.views);
      } catch {
        // Ignore view update failures on the detail page.
      }
    }

    void registerView();

    return () => {
      controller.abort();
    };
  }, [project.id, project.views]);

  return (
    <div className="min-h-screen bg-bg px-6 pb-20 pt-24">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/#projects"
          className="mb-10 inline-flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-text-primary"
        >
          <ArrowLeft size={16} />
          Back to projects
        </Link>

        <Card className="mb-8 gap-0 overflow-hidden p-0">
          <div className="relative h-72 overflow-hidden md:h-[420px]">
            <ProjectMedia
              image={project.image}
              video={project.video}
              title={project.title}
              priority
              width={1440}
              height={900}
              mediaClassName="scale-[1.01]"
              sizes="(max-width: 1024px) 100vw, 1200px"
            />
          </div>

          <div className="space-y-6 p-8">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-muted">
                  {project.category}
                </p>
                <h1 className="mt-2 text-3xl font-bold text-text-primary md:text-4xl">
                  {project.title}
                </h1>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <span
                  className={clsx(
                    "rounded-full border px-3 py-1 text-xs font-medium",
                    statusConfig[project.status].color
                  )}
                >
                  {statusConfig[project.status].label}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/20 bg-accent/5 px-3 py-1 text-xs font-medium text-accent">
                  <Eye size={13} />
                  {views.toLocaleString()} views
                </span>
              </div>
            </div>

            <p className="max-w-3xl text-base leading-relaxed text-text-secondary">
              {project.description}
            </p>

            <div className="flex flex-wrap items-center gap-3">
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent/90"
                >
                  <ExternalLink size={14} />
                  Live Demo
                </a>
              )}

              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-border px-4 py-2 text-sm font-medium text-text-secondary transition-colors hover:text-text-primary"
                >
                  <FaGithub size={14} />
                  GitHub
                </a>
              )}

              {project.figma && (
                <a
                  href={project.figma}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-border px-4 py-2 text-sm font-medium text-text-secondary transition-colors hover:text-text-primary"
                >
                  <FaFigma size={14} />
                  Figma
                </a>
              )}
            </div>
          </div>
        </Card>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-text-primary">
              <Code2 size={15} className="text-accent" />
              Tech Stack
            </h2>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-border bg-bg px-3 py-1.5 text-sm text-text-secondary"
                >
                  {tech}
                </span>
              ))}
            </div>
          </Card>

          <Card>
            <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-text-primary">
              <MonitorSmartphone size={15} className="text-accent" />
              Supported Platforms
            </h2>
            <div className="flex flex-wrap gap-3">
              {project.platforms.map((platform) => {
                const Icon = platformIcons[platform].icon;

                return (
                  <span
                    key={platform}
                    className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1.5 text-sm text-text-secondary"
                  >
                    <Icon size={14} />
                    {platformIcons[platform].label}
                  </span>
                );
              })}
            </div>
          </Card>

          {!!project.learned?.length && (
            <Card className="md:col-span-2">
              <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-text-primary">
                <Lightbulb size={15} className="text-amber-400" />
                What I Learned
              </h2>
              <ul className="grid gap-3 md:grid-cols-2">
                {project.learned.map((item) => (
                  <li
                    key={item}
                    className="rounded-xl border border-border bg-bg/60 p-4 text-sm leading-relaxed text-text-secondary"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
