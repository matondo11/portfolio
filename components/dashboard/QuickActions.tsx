'use client';

import { motion } from 'framer-motion';
import { Plus, Upload, MessageSquare, Download } from 'lucide-react';

interface QuickAction {
  icon: React.ReactNode;
  label: string;
  description: string;
  action: () => void;
  color: string;
}

const defaultActions: QuickAction[] = [
  {
    icon: <Plus size={20} />,
    label: 'Novo Projeto',
    description: 'Adicionar novo projeto',
    action: () => {},
    color: 'from-violet-600 to-violet-500',
  },
  {
    icon: <Upload size={20} />,
    label: 'Upload de Mídia',
    description: 'Enviar imagens/vídeos',
    action: () => {},
    color: 'from-cyan-600 to-cyan-500',
  },
  {
    icon: <MessageSquare size={20} />,
    label: 'Novo Feedback',
    description: 'Ver feedbacks recentes',
    action: () => {},
    color: 'from-emerald-600 to-emerald-500',
  },
  {
    icon: <Download size={20} />,
    label: 'Exportar Dados',
    description: 'Baixar relatório',
    action: () => {},
    color: 'from-amber-600 to-amber-500',
  },
];

export function QuickActions({ actions = defaultActions }: { actions?: QuickAction[] }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-4"
    >
      {actions.map((action, index) => (
        <motion.button
          key={index}
          variants={itemVariants}
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
          whileTap={{ scale: 0.95 }}
          onClick={action.action}
          className={`group relative overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 p-6 text-left transition-all hover:border-zinc-700`}
        >
          {/* Gradient Background */}
          <div
            className={`absolute inset-0 opacity-0 transition-opacity group-hover:opacity-10 bg-gradient-to-br ${action.color}`}
          ></div>

          {/* Content */}
          <div className="relative">
            <div className={`mb-3 inline-flex rounded-lg bg-gradient-to-br ${action.color} p-2 text-white`}>
              {action.icon}
            </div>
            <h3 className="font-semibold text-zinc-100 text-sm">{action.label}</h3>
            <p className="mt-1 text-xs text-zinc-500">{action.description}</p>
          </div>

          {/* Hover Arrow */}
          <div className="absolute right-4 bottom-4 text-zinc-600 transition-transform group-hover:translate-x-1 group-hover:translate-y-1">
            →
          </div>
        </motion.button>
      ))}
    </motion.div>
  );
}
