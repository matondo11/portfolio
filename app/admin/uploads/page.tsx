'use client';

import { motion } from 'framer-motion';
import { AdminPageShell } from '@/components/dashboard/AdminPageShell';

export default function AdminUploadsPage() {
  return (
    <AdminPageShell
      title="Mídia"
      description="Gerencie uploads de imagens, banners, PDFs e outros ativos visuais."
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid gap-6"
      >
        <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6 text-zinc-300">
          <h2 className="text-xl font-semibold text-white mb-3">Gerenciamento de mídia</h2>
          <p className="leading-relaxed text-zinc-400">
            Faça upload dos ativos do site e organize os arquivos que serão usados nas páginas."
          </p>
        </div>
      </motion.div>
    </AdminPageShell>
  );
}
