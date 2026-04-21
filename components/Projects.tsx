"use client";

import { useState } from "react";
import { projects } from "@/data/projects";
import ProjectCard from "@/components/ProjectCard";
import ProjectFilter from "@/components/ProjectFilter";
import { FilterTag } from "@/types";
import SectionHeader from "@/components/SectionHeader";

export default function Projects() {
  const [active, setActive] = useState<FilterTag | "All">("All");

  const filtered =
    active === "All"
      ? projects
      : projects.filter((p) => p.filterTags.includes(active));

  return (
    <section id="projects" className="relative py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          eyebrow="Portfolio"
          title="Selected Projects"
          description="A curated selection of production systems, tools, and experiments I've shipped."
        />

        {/* Filter */}
        <div className="mt-8 mb-10">
          <ProjectFilter active={active} onChange={setActive} />
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-text-secondary">
            <p className="text-lg">No projects found for this filter.</p>
          </div>
        )}
      </div>
    </section>
  );
}
