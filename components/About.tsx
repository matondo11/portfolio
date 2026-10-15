'use client';

import { motion } from 'framer-motion';
import { useProfile } from '@/components/hooks/useProfile';

export default function About() {
  const { profile, loading } = useProfile();

  return (
    <section className="py-20 px-4 max-w-4xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-center mb-12"
      >
        Sobre Mim
      </motion.h2>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-lg leading-relaxed"
      >
        <p className="mb-6">
          {loading ? 'Carregando perfil...' : profile.about}
        </p>
        <p>
          {loading
            ? 'Usando dados do seu perfil carregado do CMS.'
            : 'Atualize essas informações no painel de administração para manter tudo atualizado sem editar código.'}
        </p>
      </motion.div>
    </section>
  );
}
