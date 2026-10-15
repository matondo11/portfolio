'use client';

import { motion } from 'framer-motion';
import { AdminPageShell } from '@/components/dashboard/AdminPageShell';
import ProfileForm from '@/components/dashboard/ProfileForm';

export default function AdminProfilePage() {
  return (
    <AdminPageShell
      title="Perfil"
      description="Gerencie a apresentação do perfil, a foto, o banner, o resumo e os principais contatos."
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid gap-6"
      >
        <ProfileForm />
      </motion.div>
    </AdminPageShell>
  );
}
