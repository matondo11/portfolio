'use client';

import { motion } from 'framer-motion';
import { TrendingUp, BarChart3, Eye, MessageCircle, Zap } from 'lucide-react';
import { DashboardStats } from '@/types/dashboard';
import { StatCard } from './shared/StatCard';

export function DashboardStatsCards({ stats }: { stats: DashboardStats }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4"
    >
      <StatCard
        icon={BarChart3}
        label="Total de Projetos"
        value={stats.total}
        change={12}
        changeLabel="vs mês passado"
        description="Todos os projetos cadastrados"
      />

      <StatCard
        icon={TrendingUp}
        label="Em Produção"
        value={stats.production}
        change={8}
        changeLabel="vs mês passado"
        description="Projetos ativos"
      />

      <StatCard
        icon={Eye}
        label="Visualizações"
        value={stats.viewsThisMonth}
        change={24}
        changeLabel="vs mês passado"
        description="Acessos este mês"
      />

      <StatCard
        icon={MessageCircle}
        label="Feedbacks"
        value={stats.feedbackCount}
        change={5}
        changeLabel="vs mês passado"
        description="Mensagens recebidas"
      />
    </motion.div>
  );
}
