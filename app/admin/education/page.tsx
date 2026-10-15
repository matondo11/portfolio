'use client';

import { motion } from 'framer-motion';
import { AdminPageShell } from '@/components/dashboard/AdminPageShell';

export default function AdminEducationPage() {
  return (
    <AdminPageShell
      title="Educação"
      description="Gerencie sua formação acadêmica e cursos relevantes para o portfólio."
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid gap-6"
      >
        <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6 text-zinc-300">
          <h2 className="text-xl font-semibold text-white mb-3">Formação</h2>
          <p className="leading-relaxed text-zinc-400">
            Use este painel para cadastrar instituições, cursos, anos e descrições de formação.
          </p>
        </div>
      </motion.div>
    </AdminPageShell>
  );
}
