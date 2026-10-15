'use client';

import { useEffect, useState } from 'react';
import { TimelineItem } from '@/types';

export function useTimeline() {
  const [items, setItems] = useState<TimelineItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function loadTimeline() {
      try {
        const response = await fetch('/api/timeline');
        const data = await response.json();
        if (!response.ok) throw new Error(data?.error || 'Falha ao carregar trajetória');
        if (mounted && Array.isArray(data)) setItems(data);
      } catch (err) {
        if (mounted) setError((err as Error)?.message || 'Falha ao carregar trajetória');
      } finally {
        if (mounted) setLoading(false);
      }
    }

    loadTimeline();
    return () => { mounted = false; };
  }, []);

  return { items, loading, error };
}