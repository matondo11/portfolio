'use client';

import { motion } from 'framer-motion';
import { Code, Server, Palette } from 'lucide-react';

const services = [
  {
    icon: <Code className="w-12 h-12" />,
    title: 'Desenvolvimento Web',
    description: 'Criação de aplicações web modernas e responsivas.',
  },
  {
    icon: <Server className="w-12 h-12" />,
    title: 'APIs Backend',
    description: 'Desenvolvimento de APIs robustas e escaláveis.',
  },
  {
    icon: <Palette className="w-12 h-12" />,
    title: 'UI/UX',
    description: 'Design de interfaces intuitivas e experiências excepcionais.',
  },
];

export default function Services() {
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
        {services.map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            className="bg-gray-800 p-6 rounded-lg text-center hover:bg-gray-700 transition-colors"
          >
            <div className="text-blue-400 mb-4 flex justify-center">{service.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
            <p>{service.description}</p>
          </motion.div>
        ))}
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