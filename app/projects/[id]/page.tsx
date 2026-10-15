'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Project } from '@/types';
import ProjectDetail from '@/components/ProjectDetail';
import { projects as fallbackProjects } from '@/data/projects';

export default function ProjectPage() {
  const params = useParams<{ id: string }>();
  const id = params?.id;
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function loadProject() {
      try {
        const response = await fetch('/api/projects');
        const data = await response.json();
        const list = Array.isArray(data)
          ? data
          : Array.isArray(data?.projects)
            ? data.projects
            : fallbackProjects;

        const found = list.find((item: Project) => String(item.id ?? item._id ?? '') === String(id))
          ?? fallbackProjects.find((item) => String(item.id ?? item._id ?? '') === String(id))
          ?? null;

        if (mounted) {
          setProject(found);
        }
      } catch (error) {
        if (mounted) {
          const found = fallbackProjects.find((item) => String(item.id ?? item._id ?? '') === String(id)) ?? null;
          setProject(found);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    if (id) {
      loadProject();
    }

    return () => {
      mounted = false;
    };
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen bg-[var(--background)] px-6 pb-20 pt-28 text-[var(--text-primary)]">
        <div className="mx-auto max-w-3xl animate-pulse space-y-6">
          <div className="h-12 w-2/3 rounded bg-[var(--surface)]" />
          <div className="h-64 rounded-2xl bg-[var(--surface)]" />
          <div className="h-24 rounded bg-[var(--surface)]" />
        </div>
      </main>
    );
  }

  if (!project) {
    return (
      <main className="min-h-screen bg-[var(--background)] px-6 py-24 text-[var(--text-primary)]">
        <div className="mx-auto max-w-2xl rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8 text-center">
          <p className="brand-label mb-3">PROJETO</p>
          <h1 className="text-3xl font-semibold">Projeto não encontrado</h1>
          <a href="/projects" className="brand-button-primary mt-6 inline-flex items-center">Voltar ao portfólio</a>
        </div>
      </main>
    );
  }

  return <ProjectDetail project={project} />;
}
