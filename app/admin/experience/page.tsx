'use client';

import { motion } from 'framer-motion';
import { AdminPageShell } from '@/components/dashboard/AdminPageShell';

export default function AdminExperiencePage() {
  return (
    <AdminPageShell
      title="Experiência"
      description="Adicione, edite e organize experiências profissionais com datas, cargos e descrições."
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid gap-6"
      >
        <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6 text-zinc-300">
          <h2 className="text-xl font-semibold text-white mb-3">Linha do tempo profissional</h2>
          <p className="leading-relaxed text-zinc-400">
            Crie e organize entradas de experiência com empresa, cargo, período e destaque das principais responsabilidades.
          </p>
        </div>
      </motion.div>
    </AdminPageShell>
  );
}
