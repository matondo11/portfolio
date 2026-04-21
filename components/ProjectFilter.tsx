"use client";

import clsx from "clsx";
import { FilterTag } from "@/types";

const filters: { label: string; value: FilterTag | "All" }[] = [
  { label: "All", value: "All" },
  { label: "React", value: "React" },
  { label: "Next.js", value: "Next.js" },
  { label: "Node.js", value: "Node.js" },
  { label: "NestJS", value: "NestJS" },
  { label: "Fullstack", value: "Fullstack" },
];

interface Props {
  active: FilterTag | "All";
  onChange: (tag: FilterTag | "All") => void;
}

export default function ProjectFilter({ active, onChange }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((f) => (
        <button
          key={f.value}
          onClick={() => onChange(f.value)}
          className={clsx(
            "px-4 py-2 text-sm rounded-lg border font-medium transition-all duration-200",
            active === f.value
              ? "bg-accent border-accent text-white shadow-glow"
              : "bg-surface border-border text-text-secondary hover:text-text-primary hover:border-accent/40"
          )}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}
