'use client';

import { motion } from 'framer-motion';

export default function About() {
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
          Sou um desenvolvedor Full Stack em crescimento, com foco em React, Next.js e Node.js.
          Recentemente implementei autenticação com Google e estou aprendendo React Native.
          Inspirado por Gustavo Guanabara, estudo cibersegurança através da Cisco Networking Academy.
        </p>
        <p>
          Apaixonado por criar soluções inovadoras e eficientes, sempre buscando aprender novas tecnologias.
        </p>
      </motion.div>
    </section>
  );
}