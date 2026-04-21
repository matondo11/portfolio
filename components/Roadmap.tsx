import { skills } from "@/data/skills";
import { Skill } from "@/types";
import SectionHeader from "@/components/SectionHeader";
import { CheckCircle2, Loader2, Clock } from "lucide-react";
import clsx from "clsx";

const categories: {
  level: Skill["level"];
  label: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  border: string;
  bg: string;
}[] = [
  {
    level: "mastered",
    label: "Mastered",
    description: "Technologies I use confidently in production.",
    icon: <CheckCircle2 size={16} />,
    color: "text-emerald-400",
    border: "border-emerald-400/20",
    bg: "bg-emerald-400/5",
  },
  {
    level: "learning",
    label: "Learning",
    description: "Currently deepening my knowledge here.",
    icon: <Loader2 size={16} className="animate-spin" />,
    color: "text-amber-400",
    border: "border-amber-400/20",
    bg: "bg-amber-400/5",
  },
  {
    level: "planned",
    label: "Planned",
    description: "On my roadmap for the near future.",
    icon: <Clock size={16} />,
    color: "text-accent-2",
    border: "border-accent-2/20",
    bg: "bg-accent-2/5",
  },
];

const tagColors: Record<Skill["level"], string> = {
  mastered: "bg-emerald-400/10 border-emerald-400/20 text-emerald-300",
  learning: "bg-amber-400/10 border-amber-400/20 text-amber-300",
  planned: "bg-accent-2/10 border-accent-2/20 text-purple-300",
};

export default function Roadmap() {
  return (
    <section id="roadmap" className="relative py-24 px-6 overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

      <div className="max-w-6xl mx-auto">
        <SectionHeader
          eyebrow="Skills & Roadmap"
          title="Tech Stack"
          description="Where I've been, where I am, and where I'm heading."
        />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((cat) => {
            const catSkills = skills.filter((s) => s.level === cat.level);
            return (
              <div
                key={cat.level}
                className={clsx(
                  "rounded-2xl border p-6 flex flex-col gap-4",
                  cat.border,
                  cat.bg,
                  "glass"
                )}
              >
                {/* Category header */}
                <div className="flex items-center gap-2">
                  <span className={cat.color}>{cat.icon}</span>
                  <h3 className={clsx("font-semibold text-sm", cat.color)}>
                    {cat.label}
                  </h3>
                </div>
                <p className="text-xs text-text-secondary leading-relaxed -mt-2">
                  {cat.description}
                </p>

                {/* Skills */}
                <div className="flex flex-wrap gap-2 mt-1">
                  {catSkills.map((skill) => (
                    <span
                      key={skill.name}
                      className={clsx(
                        "px-3 py-1.5 text-xs rounded-lg border font-medium transition-all hover:scale-105",
                        tagColors[skill.level]
                      )}
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
