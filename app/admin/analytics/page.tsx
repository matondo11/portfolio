'use client';

import { motion } from 'framer-motion';
import { AdminPageShell } from '@/components/dashboard/AdminPageShell';

export default function AdminAnalyticsPage() {
  return (
    <AdminPageShell
      title="Analytics"
      description="Acompanhe métricas, visualizações e desempenho do portfólio em tempo real."
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid gap-6"
      >
        <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6 text-zinc-300">
          <h2 className="text-xl font-semibold text-white mb-3">Visão analítica</h2>
          <p className="leading-relaxed text-zinc-400">
            Esta área exibirá gráficos de visitas, downloads de currículo e métricas de engajamento.
          </p>
        </div>
      </motion.div>
    </AdminPageShell>
  );
}
