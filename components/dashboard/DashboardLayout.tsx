'use client';

import { motion } from 'framer-motion';
import { DashboardSidebar } from './DashboardSidebar';
import { DashboardHeader } from './DashboardHeader';
import { DashboardProvider } from './DashboardContext';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <DashboardProvider>
      <div className="flex h-screen bg-zinc-950 text-zinc-100">
        <DashboardSidebar />

        <div className="flex-1 flex flex-col overflow-hidden md:ml-0">
          <DashboardHeader />

          <main className="flex-1 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="p-4 md:p-8"
            >
              {children}
            </motion.div>
          </main>
        </div>
      </div>
    </DashboardProvider>
  );
}
