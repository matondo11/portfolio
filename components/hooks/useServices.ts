'use client';

import { useEffect, useState } from 'react';
import { Service } from '@/types';

export function useServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function fetchServices() {
      try {
        const response = await fetch('/api/services');
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data?.error || 'Falha ao carregar serviços');
        }

        if (mounted && Array.isArray(data)) {
          setServices(data);
        }
      } catch (err) {
        if (mounted) {
          setError((err as Error)?.message || 'Erro ao carregar serviços');
          setServices([]);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    fetchServices();

    return () => {
      mounted = false;
    };
  }, []);

  return { services, loading, error };
}
