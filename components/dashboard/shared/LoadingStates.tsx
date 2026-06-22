'use client';

import { motion } from 'framer-motion';

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className = '' }: SkeletonProps) {
  return (
    <motion.div
      animate={{ opacity: [0.5, 0.8, 0.5] }}
      transition={{ duration: 2, repeat: Infinity }}
      className={`bg-zinc-800 rounded ${className}`}
    />
  );
}

export function LoadingCard() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="rounded-xl border border-zinc-800 bg-zinc-900 p-6 space-y-4"
    >
      <Skeleton className="h-4 w-20" />
      <Skeleton className="h-8 w-16" />
      <Skeleton className="h-3 w-full" />
    </motion.div>
  );
}

export function LoadingTable() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="rounded-xl border border-zinc-800 bg-zinc-900 p-6 space-y-4"
    >
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-12 w-full" />
        ))}
      </div>
    </motion.div>
  );
}

export function LoadingChart() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="rounded-xl border border-zinc-800 bg-zinc-900 p-6 h-80"
    >
      <Skeleton className="h-full w-full" />
    </motion.div>
  );
}

export function EmptyState({
  title,
  description,
  icon: Icon,
  action,
}: {
  title: string;
  description: string;
  icon?: React.ComponentType<{ size?: number; className?: string }>;
  action?: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl border border-dashed border-zinc-700 bg-zinc-900/50 p-12 text-center"
    >
      {Icon && <Icon size={48} className="mx-auto mb-4 text-zinc-600" />}
      <h3 className="text-lg font-semibold text-zinc-100 mb-2">{title}</h3>
      <p className="text-sm text-zinc-400 mb-6">{description}</p>
      {action}
    </motion.div>
  );
}
