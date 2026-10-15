'use client';

import { useEffect, useState } from 'react';
import { Project } from '@/types';
import { projects as defaultProjects } from '@/data/projects';

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>(defaultProjects);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function fetchProjects() {
      try {
        const response = await fetch('/api/projects');
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data?.error || 'Falha ao carregar projetos');
        }

        if (mounted) {
          if (Array.isArray(data)) {
            setProjects(data);
            return;
          }

          if (data && typeof data === 'object' && 'projects' in data && Array.isArray(data.projects)) {
            setProjects(data.projects as Project[]);
            return;
          }

          setProjects(defaultProjects);
        }
      } catch (err) {
        if (mounted) {
          setError((err as Error)?.message || 'Erro ao carregar projetos');
          setProjects(defaultProjects);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    fetchProjects();

    return () => {
      mounted = false;
    };
  }, []);

  return { projects, loading, error };
}
