'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Activity, CheckCircle, Upload, MessageSquare } from 'lucide-react';
import { ActivityItem } from '@/types/dashboard';

const activityIcons: Record<string, React.ComponentType<{ size: number; className: string }>> = {
  'project-created': CheckCircle,
  'feedback-received': MessageSquare,
};

const activityColors: Record<string, string> = {
  'project-created': 'bg-emerald-500/20 text-emerald-400',
  'feedback-received': 'bg-blue-500/20 text-blue-400',
};

export function RecentActivity({ activities }: { activities: ActivityItem[] }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="rounded-xl border border-zinc-800 bg-zinc-900 p-6"
    >
      <div className="flex items-center gap-2 mb-6">
        <Activity size={20} className="text-violet-500" />
        <h2 className="text-lg font-bold text-zinc-50">Atividades Recentes</h2>
      </div>

      <div className="space-y-4">
        {activities.map((activity, index) => {
          const Icon = activityIcons[activity.type] || Activity;
          const colorClass = activityColors[activity.type];

          return (
            <motion.div key={activity.id} variants={itemVariants} className="flex gap-4">
              {/* Timeline dot and line */}
              <div className="flex flex-col items-center">
                <div className={`rounded-full p-2 ${colorClass}`}>
                  <Icon size={16} className="text-white" />
                </div>
                {index < activities.length - 1 && (
                  <div className="mt-2 h-8 w-0.5 bg-gradient-to-b from-zinc-700 to-transparent"></div>
                )}
              </div>

              {/* Content */}
              <div className="flex-1 py-1">
                <p className="text-sm font-medium text-zinc-100">{activity.title}</p>
                <p className="text-xs text-zinc-500">{activity.description}</p>
                <p className="mt-1 text-xs text-zinc-600">
                  {new Date(activity.timestamp).toLocaleString('pt-BR')}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {activities.length === 0 && (
        <div className="text-center py-12 text-zinc-500">
          <Activity size={32} className="mx-auto mb-2 opacity-50" />
          <p className="text-sm">Nenhuma atividade ainda</p>
        </div>
      )}
    </motion.div>
  );
}
