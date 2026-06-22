'use client';

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: number;
  change?: number;
  changeLabel?: string;
  description?: string;
}

export function StatCard({
  icon: Icon,
  label,
  value,
  change,
  changeLabel,
  description,
}: StatCardProps) {
  const isPositive = change ? change >= 0 : true;

  return (
    <motion.div
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="group rounded-xl border border-zinc-800 bg-zinc-900 p-6 transition-all hover:border-zinc-700 hover:bg-zinc-900/80"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
            {label}
          </p>
          <p className="mt-3 text-3xl font-bold text-zinc-50">{value.toLocaleString()}</p>

          {change !== undefined && (
            <div className="mt-4 flex items-center gap-2">
              <span
                className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold ${
                  isPositive
                    ? 'bg-emerald-500/15 text-emerald-400'
                    : 'bg-red-500/15 text-red-400'
                }`}
              >
                <span>{isPositive ? '↑' : '↓'}</span>
                <span>{Math.abs(change)}%</span>
              </span>
              {changeLabel && (
                <span className="text-xs text-zinc-400">{changeLabel}</span>
              )}
            </div>
          )}

          {description && (
            <p className="mt-2 text-xs text-zinc-500">{description}</p>
          )}
        </div>

        <div className="ml-4 rounded-lg bg-zinc-800/50 p-3 text-zinc-400 transition-transform group-hover:scale-110">
          <Icon size={24} />
        </div>
      </div>
    </motion.div>
  );
}
