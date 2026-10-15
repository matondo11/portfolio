'use client';

import { motion } from 'framer-motion';
import { Code, Server, Palette } from 'lucide-react';
import { useServices } from '@/components/hooks/useServices';

const iconMap = {
  Code,
  Server,
  Palette,
};

export default function Services() {
  const { services, loading } = useServices();

  return (
    <section className="py-20 px-4 max-w-6xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-center mb-12"
      >
        Serviços
      </motion.h2>

      <div className="grid md:grid-cols-3 gap-8">
        {loading
          ? Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="h-72 rounded-2xl bg-gray-800/70 animate-pulse"
              />
            ))
          : services.map((service, index) => {
              const Icon = iconMap[(service.icon as keyof typeof iconMap) || 'Code'] || Code;

              return (
                <motion.div
                  key={`${service.title}-${index}`}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="bg-gray-800 p-6 rounded-lg text-center hover:bg-gray-700 transition-colors"
                >
                  <div className="text-blue-400 mb-4 flex justify-center">
                    <Icon className="w-12 h-12" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                  <p>{service.description}</p>
                </motion.div>
              );
            })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="text-center mt-12"
      >
        <button className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-lg font-semibold text-lg">
          Pedir Orçamento
        </button>
      </motion.div>
    </section>
  );
}
