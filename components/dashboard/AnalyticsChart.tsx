'use client';

import { motion } from 'framer-motion';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { ProjectStats } from '@/types/dashboard';

const COLORS = {
  production: '#10b981',
  inProgress: '#f59e0b',
  idea: '#6b7280',
};

export function AnalyticsCharts({ data }: { data: ProjectStats }) {
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
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 lg:grid-cols-2 gap-6"
    >
      {/* Views Chart */}
      <motion.div variants={itemVariants} className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
        <h3 className="mb-4 text-lg font-bold text-zinc-50">Visualizações por Mês</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data.monthlyViews}>
            <defs>
              <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#3f3f46" />
            <XAxis dataKey="month" stroke="#71717a" />
            <YAxis stroke="#71717a" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#18181b',
                border: '1px solid #27272a',
                borderRadius: '8px',
              }}
              labelStyle={{ color: '#fafafa' }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#7c3aed"
              fillOpacity={1}
              fill="url(#colorViews)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Projects Created Chart */}
      <motion.div variants={itemVariants} className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
        <h3 className="mb-4 text-lg font-bold text-zinc-50">Projetos Criados por Mês</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data.monthlyProjects}>
            <CartesianGrid strokeDasharray="3 3" stroke="#3f3f46" />
            <XAxis dataKey="month" stroke="#71717a" />
            <YAxis stroke="#71717a" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#18181b',
                border: '1px solid #27272a',
                borderRadius: '8px',
              }}
              labelStyle={{ color: '#fafafa' }}
            />
            <Bar dataKey="value" fill="#06b6d4" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Status Distribution */}
      <motion.div variants={itemVariants} className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
        <h3 className="mb-4 text-lg font-bold text-zinc-50">Distribuição por Status</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data.statusDistribution}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent = 0 }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.statusDistribution.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: '#18181b',
                border: '1px solid #27272a',
                borderRadius: '8px',
              }}
              labelStyle={{ color: '#fafafa' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Stats Summary */}
      <motion.div variants={itemVariants} className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
        <h3 className="mb-4 text-lg font-bold text-zinc-50">Resumo de Dados</h3>
        <div className="space-y-4">
          {data.statusDistribution.map((stat) => (
            <div key={stat.name} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: stat.fill }}
                ></div>
                <span className="text-sm text-zinc-400">{stat.name}</span>
              </div>
              <span className="text-sm font-bold text-zinc-100">{stat.value}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
