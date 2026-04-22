'use client';

import { motion } from 'framer-motion';
import ReactTypingEffect from 'react-typing-effect';

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
      <div className="text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <img
            src="/profile.png"
            alt="Foto de perfil"
            className="w-32 h-32 rounded-full mx-auto border-4 border-blue-500"
          />
        </motion.div>
        <motion.h1
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-5xl font-bold mb-4"
        >
          Olá, sou [Seu Nome]
        </motion.h1>
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-2xl text-blue-400 mb-8"
        >
          <ReactTypingEffect
            text={['Desenvolvedor Full Stack', 'Apaixonado por Tecnologia', 'Criador de Soluções']}
            speed={100}
            eraseSpeed={50}
            typingDelay={1000}
          />
        </motion.div>
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="space-x-4"
        >
          <button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold">
            Ver Projetos
          </button>
          <button className="border border-blue-600 hover:bg-blue-600 px-6 py-3 rounded-lg font-semibold">
            Contactar
          </button>
        </motion.div>
      </div>
    </section>
  );
}