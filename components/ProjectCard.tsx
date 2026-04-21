"use client";

import type { ComponentType } from "react";
import Link from "next/link";
import clsx from "clsx";
import { ArrowUpRight, Cable, Code2, Eye, Globe } from "lucide-react";
import { FaAndroid, FaApple, FaFigma, FaGithub } from "react-icons/fa";
import {
  SiCloudinary,
  SiDocker,
  SiExpo,
  SiFirebase,
  SiMongodb,
  SiNestjs,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiReact,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";
import ProjectMedia from "@/components/ProjectMedia";
import type { Project } from "@/types";

type IconGlyph = ComponentType<{
  className?: string;
  size?: number | string;
}>;

const categoryLabels = {
  frontend: "Frontend",
  backend: "Backend",
  fullstack: "Full Stack",
  mobile: "Mobile",
  tools: "Tools",
};

const statusConfig = {
  production: {
    label: "Production",
    badgeClassName:
      "border-emerald-400/25 bg-emerald-500/10 text-emerald-100 shadow-[0_0_22px_rgba(16,185,129,0.14)]",
    dotClassName: "bg-emerald-400",
    animated: true,
  },
  progress: {
    label: "In Progress",
    badgeClassName: "border-amber-300/25 bg-amber-400/10 text-amber-100",
    dotClassName: "bg-amber-300",
    animated: false,
  },
  planned: {
    label: "Planned",
    badgeClassName: "border-white/10 bg-slate-400/10 text-slate-200",
    dotClassName: "bg-slate-300",
    animated: false,
  },
};

const platformIcons = {
  web: { label: "Web", icon: Globe },
  android: { label: "Android", icon: FaAndroid },
  ios: { label: "iOS", icon: FaApple },
};

const technologyIcons: Record<
  string,
  {
    icon: IconGlyph;
    className: string;
  }
> = {
  nextjs: { icon: SiNextdotjs, className: "text-white" },
  react: { icon: SiReact, className: "text-sky-300" },
  reactnative: { icon: SiReact, className: "text-sky-300" },
  tailwindcss: { icon: SiTailwindcss, className: "text-cyan-300" },
  nestjs: { icon: SiNestjs, className: "text-rose-300" },
  mongodb: { icon: SiMongodb, className: "text-emerald-300" },
  nodejs: { icon: SiNodedotjs, className: "text-emerald-300" },
  typescript: { icon: SiTypescript, className: "text-blue-300" },
  cloudinary: { icon: SiCloudinary, className: "text-sky-200" },
  websockets: { icon: Cable, className: "text-indigo-200" },
  expo: { icon: SiExpo, className: "text-white" },
  firebase: { icon: SiFirebase, className: "text-amber-300" },
  figma: { icon: FaFigma, className: "text-pink-300" },
  postgresql: { icon: SiPostgresql, className: "text-sky-300" },
  docker: { icon: SiDocker, className: "text-blue-300" },
};

interface ProjectCardProps {
  project: Project;
}

type ActionIcon = IconGlyph;

function formatViews(value: number) {
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: value >= 1000 ? 1 : 0,
  }).format(value);
}

function getExperienceBadge(years = 0) {
  if (years < 1) {
    return {
      label: "Beginner",
      detail: "<1y",
      className: "border-sky-400/25 bg-sky-400/10 text-sky-100",
    };
  }

  if (years < 3) {
    return {
      label: "Intermediate",
      detail: `${years}y`,
      className: "border-violet-400/25 bg-violet-400/10 text-violet-100",
    };
  }

  return {
    label: "Advanced",
    detail: `${years}y`,
    className: "border-emerald-400/25 bg-emerald-400/10 text-emerald-100",
  };
}

function getTechnologyKey(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]/g, "");
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const status = statusConfig[project.status];
  const experience = getExperienceBadge(project.experienceYears);
  const visibleTechnologies = project.technologies.slice(0, 4);
  const hiddenTechnologyCount = Math.max(project.technologies.length - visibleTechnologies.length, 0);

  const actions = [
    project.github
      ? {
          href: project.github,
          label: `${project.title} GitHub repository`,
          icon: FaGithub,
        }
      : null,
    project.live
      ? {
          href: project.live,
          label: `${project.title} live demo`,
          icon: ArrowUpRight,
        }
      : null,
    project.figma
      ? {
          href: project.figma,
          label: `${project.title} Figma file`,
          icon: FaFigma,
        }
      : null,
  ].filter(Boolean) as Array<{
    href: string;
    label: string;
    icon: ActionIcon;
  }>;

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[28px] border border-border bg-surface/60 backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] hover:border-accent/20 hover:shadow-glow">
      <div className="relative h-56 overflow-hidden border-b border-white/8 sm:h-60">
        <ProjectMedia
          image={project.image}
          video={project.video}
          title={project.title}
          width={960}
          height={600}
          mediaClassName="group-hover:scale-[1.04]"
        />

        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4">
          <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-white/85 backdrop-blur">
            {categoryLabels[project.category]}
          </span>

          <span
            className={clsx(
              "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] backdrop-blur",
              status.badgeClassName
            )}
          >
            <span className="relative flex h-2.5 w-2.5 items-center justify-center">
              {status.animated && (
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/80" />
              )}
              <span className={clsx("relative h-2.5 w-2.5 rounded-full", status.dotClassName)} />
            </span>
            {status.label}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-5 p-5 sm:p-6">
        <div className="space-y-3">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <Link
                href={`/projects/${project.slug}`}
                className="inline-flex max-w-full items-center gap-2 text-xl font-semibold text-text-primary transition-colors hover:text-white"
              >
                <span className="truncate">{project.title}</span>
              </Link>
            </div>

            <span
              className={clsx(
                "inline-flex shrink-0 items-center gap-2 rounded-full border px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.18em] shadow-[0_0_18px_rgba(59,130,246,0.12)]",
                experience.className
              )}
            >
              {experience.label}
              <span className="text-[10px] text-white/70">{experience.detail}</span>
            </span>
          </div>

          <p className="text-sm leading-6 text-text-secondary [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2] overflow-hidden">
            {project.description}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {project.platforms.map((platform) => {
            const Icon = platformIcons[platform].icon;

            return (
              <span
                key={platform}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-text-secondary"
              >
                <Icon size={13} />
                {platformIcons[platform].label}
              </span>
            );
          })}
        </div>

        <div className="flex flex-wrap gap-2">
          {visibleTechnologies.map((technology) => {
            const technologyKey = getTechnologyKey(technology);
            const technologyMeta = technologyIcons[technologyKey];
            const Icon = technologyMeta?.icon ?? Code2;

            return (
              <span
                key={technology}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-text-secondary"
              >
                <Icon
                  size={13}
                  className={technologyMeta?.className ?? "text-accent"}
                />
                <span className="truncate">{technology}</span>
              </span>
            );
          })}

          {hiddenTechnologyCount > 0 && (
            <span className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-text-secondary">
              +{hiddenTechnologyCount}
            </span>
          )}
        </div>

        <div className="mt-auto flex items-center justify-between gap-3 border-t border-white/8 pt-4">
          <span className="inline-flex items-center gap-2 text-sm text-text-secondary">
            <Eye size={15} className="text-accent" />
            {formatViews(project.views)} views
          </span>

          <div className="flex items-center gap-2">
            {actions.map((action) => {
              const Icon = action.icon;

              return (
                <a
                  key={action.label}
                  href={action.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={action.label}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-text-secondary backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/30 hover:bg-accent/10 hover:text-white hover:shadow-glow"
                >
                  <Icon size={16} />
                </a>
              );
            })}

            <Link
              href={`/projects/${project.slug}`}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-medium text-text-primary transition-all duration-300 hover:border-accent/30 hover:bg-accent/10 hover:shadow-glow"
            >
              Details
              <ArrowUpRight size={15} />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
