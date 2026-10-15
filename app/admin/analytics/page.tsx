'use client';

import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { AdminPageShell } from '@/components/dashboard/AdminPageShell';
import { AnalyticsCharts } from '@/components/dashboard/AnalyticsChart';
import { ProjectStats } from '@/types/dashboard';

export default function AdminAnalyticsPage() {
  const { data, isLoading, error } = useQuery<ProjectStats>({
    queryKey: ['dashboard', 'analytics'],
    queryFn: async () => {
      const token = localStorage.getItem('token');
      const headers = new Headers();
      if (token) headers.set('Authorization', `Bearer ${token}`);
      const response = await fetch('/api/dashboard/analytics', { headers });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload?.error || 'Falha ao carregar analytics');
      return payload;
    },
  });

  return (
    <AdminPageShell
      title="Analytics"
      description="Acompanhe métricas, visualizações e desempenho do portfólio em tempo real."
    >
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="grid gap-6">
        {isLoading && <div className="h-80 animate-pulse rounded-3xl bg-zinc-900" />}
        {error && <p role="alert" className="rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-200">{(error as Error).message}</p>}
        {data && <AnalyticsCharts data={data} />}
      </motion.div>
    </AdminPageShell>
  );
}
