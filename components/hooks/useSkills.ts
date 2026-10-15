'use client';

import { useEffect, useState } from 'react';
import { Skill } from '@/types';

export function useSkills() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function fetchSkills() {
      try {
        const response = await fetch('/api/skills');
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data?.error || 'Falha ao carregar habilidades');
        }

        if (mounted && Array.isArray(data)) {
          setSkills(data);
        }
      } catch (err) {
        if (mounted) {
          setError((err as Error)?.message || 'Erro ao carregar habilidades');
          setSkills([]);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    fetchSkills();

    return () => {
      mounted = false;
    };
  }, []);

  return { skills, loading, error };
}
