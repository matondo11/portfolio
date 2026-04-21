"use client";

import { useDeferredValue, useEffect, useState, useTransition } from "react";
import { motion } from "framer-motion";
import Card from "@/components/Card";
import ProjectCard from "@/components/ProjectCard";
import ProjectFilter from "@/components/ProjectFilter";
import SectionHeader from "@/components/SectionHeader";
import type { Project, ProjectFilterValue } from "@/types";

const FILTER_VALUES: ProjectFilterValue[] = [
  "all",
  "production",
  "fullstack",
  "frontend",
  "backend",
  "mobile",
  "tools",
];

function matchesProjectFilter(project: Project, filter: ProjectFilterValue) {
  if (filter === "all") {
    return true;
  }

  if (filter === "production") {
    return project.status === "production";
  }

  return project.category === filter;
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeFilter, setActiveFilter] = useState<ProjectFilterValue>("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  const deferredFilter = useDeferredValue(activeFilter);
  const filteredProjects = projects.filter((project) =>
    matchesProjectFilter(project, deferredFilter)
  );

  const filterCounts = FILTER_VALUES.reduce(
    (counts, filter) => {
      counts[filter] = projects.filter((project) =>
        matchesProjectFilter(project, filter)
      ).length;
      return counts;
    },
    {
      all: 0,
      production: 0,
      fullstack: 0,
      frontend: 0,
      backend: 0,
      mobile: 0,
      tools: 0,
    } satisfies Record<ProjectFilterValue, number>
  );

  useEffect(() => {
    const controller = new AbortController();

    async function loadProjects() {
      setLoading(true);
      setError("");

      try {
        const res = await fetch("/api/projects", {
          cache: "no-store",
          signal: controller.signal,
        });

        if (!res.ok) {
          const data = (await res.json()) as { error?: string };
          throw new Error(data.error ?? "Failed to load projects.");
        }

        const data = (await res.json()) as { projects?: Project[] };
        setProjects(data.projects ?? []);
      } catch (loadError) {
        if (controller.signal.aborted) {
          return;
        }

        setError(
          loadError instanceof Error ? loadError.message : "Failed to load projects."
        );
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    void loadProjects();

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <section id="projects" className="relative overflow-hidden px-4 py-24 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
      <div className="pointer-events-none absolute -left-28 top-24 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-emerald-400/8 blur-3xl" />

      <div className="relative mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <SectionHeader
            eyebrow="Portfolio"
            title="Featured Projects"
            description="A curated set of polished builds with platform coverage, live status, optimized media, and a cleaner production-ready browsing experience."
          />
        </motion.div>

        <div className="mt-12 space-y-6">
          <ProjectFilter
            activeFilter={activeFilter}
            counts={filterCounts}
            onChange={(value) => startTransition(() => setActiveFilter(value))}
          />

          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-text-secondary">
              Showing{" "}
              <span className="font-semibold text-text-primary">
                {filteredProjects.length}
              </span>{" "}
              of {projects.length} project{projects.length === 1 ? "" : "s"}
            </p>

            <div className="flex items-center gap-3">
              <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300">
                {filterCounts.production} in production
              </span>

              {isPending && (
                <span className="text-sm text-muted">Updating selection...</span>
              )}
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <Card
                  key={item}
                  className="gap-0 overflow-hidden rounded-[28px] border-white/8 bg-surface/60 p-0 backdrop-blur-xl"
                >
                  <div className="h-56 animate-pulse bg-surface-2/60 sm:h-60" />
                  <div className="space-y-4 p-5 sm:p-6">
                    <div className="h-5 w-2/3 animate-pulse rounded-full bg-surface-2/60" />
                    <div className="h-14 animate-pulse rounded-2xl bg-surface-2/60" />
                    <div className="h-10 animate-pulse rounded-2xl bg-surface-2/60" />
                    <div className="h-12 animate-pulse rounded-2xl bg-surface-2/60" />
                  </div>
                </Card>
              ))}
            </div>
          ) : error ? (
            <Card className="items-center rounded-[28px] border-white/8 bg-surface/60 py-12 text-center backdrop-blur-xl">
              <p className="text-lg font-semibold text-text-primary">
                Projects could not be loaded
              </p>
              <p className="max-w-md text-sm text-text-secondary">{error}</p>
            </Card>
          ) : filteredProjects.length ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 36 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.06, duration: 0.55 }}
                  viewport={{ once: true, amount: 0.2 }}
                >
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </div>
          ) : (
            <Card className="items-center rounded-[28px] border-white/8 bg-surface/60 py-12 text-center backdrop-blur-xl">
              <p className="text-lg font-semibold text-text-primary">
                No projects match this filter yet
              </p>
              <p className="max-w-md text-sm text-text-secondary">
                Try another category to explore more of the portfolio.
              </p>
            </Card>
          )}
        </div>
      </div>
    </section>
  );
}
