'use client';

import { motion } from 'framer-motion';
import { AdminPageShell } from '@/components/dashboard/AdminPageShell';

export default function AdminSettingsPage() {
  return (
    <AdminPageShell
      title="Configurações"
      description="Defina informações do site, contatos, SEO e preferências de exibição."
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid gap-6"
      >
        <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6 text-zinc-300">
          <h2 className="text-xl font-semibold text-white mb-3">Configurações gerais</h2>
          <p className="leading-relaxed text-zinc-400">
            Atualize título do site, descrições, contatos e ajustes de experiência do usuário."
          </p>
        </div>
      </motion.div>
    </AdminPageShell>
  );
}
