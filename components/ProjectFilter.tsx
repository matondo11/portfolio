"use client";

import clsx from "clsx";
import {
  Blocks,
  BriefcaseBusiness,
  Code2,
  Layers3,
  Rocket,
  Smartphone,
  Wrench,
} from "lucide-react";
import type { ProjectFilterValue } from "@/types";

const PROJECT_FILTERS: Array<{
  label: string;
  value: ProjectFilterValue;
  icon: typeof Layers3;
}> = [
  { label: "Todos", value: "all", icon: Layers3 },
  { label: "Em Produção", value: "production", icon: Rocket },
  { label: "Full Stack", value: "fullstack", icon: Blocks },
  { label: "Frontend", value: "frontend", icon: Code2 },
  { label: "Backend", value: "backend", icon: BriefcaseBusiness },
  { label: "Mobile", value: "mobile", icon: Smartphone },
  { label: "Tools", value: "tools", icon: Wrench },
];

interface ProjectFilterProps {
  activeFilter: ProjectFilterValue;
  counts: Record<ProjectFilterValue, number>;
  onChange: (value: ProjectFilterValue) => void;
}

export default function ProjectFilter({
  activeFilter,
  counts,
  onChange,
}: ProjectFilterProps) {
  return (
    <div className="rounded-[28px] border border-border bg-surface/60 p-4 backdrop-blur-xl sm:p-5">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.24em] text-muted">
            Explore Projects
          </p>
          <p className="mt-2 text-sm text-text-secondary">
            Filtre por tipo de projeto ou veja apenas os que ja estao em producao.
          </p>
        </div>

        <div className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300">
          UI refinada para desktop e mobile
        </div>
      </div>

      <div className="flex flex-wrap gap-2.5">
        {PROJECT_FILTERS.map((filter) => {
          const Icon = filter.icon;
          const active = activeFilter === filter.value;

          return (
            <button
              key={filter.value}
              type="button"
              onClick={() => onChange(filter.value)}
              className={clsx(
                "inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-medium transition-all duration-300",
                active
                  ? "border-emerald-400/40 bg-emerald-400/15 text-emerald-200 shadow-[0_0_30px_rgba(16,185,129,0.18)]"
                  : "border-border bg-white/[0.02] text-text-secondary hover:border-white/10 hover:bg-white/[0.04] hover:text-text-primary"
              )}
            >
              <Icon size={15} />
              <span>{filter.label}</span>
              <span
                className={clsx(
                  "rounded-full px-2 py-0.5 text-[11px]",
                  active
                    ? "bg-emerald-400/15 text-emerald-100"
                    : "bg-surface-2/80 text-muted"
                )}
              >
                {counts[filter.value] ?? 0}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
