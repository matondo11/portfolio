'use client';

import * as React from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useDashboard } from './DashboardContext';

const navItems = [
  { label: 'Dashboard', href: '/admin', icon: '📊' },
  { label: 'Projetos', href: '/admin/projects', icon: '💼' },
  { label: 'Feedbacks', href: '/admin/feedbacks', icon: '💬' },
  { label: 'Analytics', href: '/admin/analytics', icon: '📈' },
  { label: 'Uploads', href: '/admin/uploads', icon: '📁' },
  { label: 'Configurações', href: '/admin/settings', icon: '⚙️' },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const { sidebarOpen, setSidebarOpen } = useDashboard();

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed left-4 top-4 z-40 rounded-lg bg-zinc-900 p-2.5 text-zinc-400 transition-colors hover:text-zinc-100 md:hidden"
      >
        {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 z-30 bg-black/50 md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          x: sidebarOpen ? 0 : -280,
          opacity: sidebarOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="fixed left-0 top-0 z-40 h-screen w-72 border-r border-zinc-800 bg-zinc-950 md:relative md:translate-x-0"
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="border-b border-zinc-800 p-6">
            <div className="text-2xl font-bold text-zinc-50">
              <span className="text-violet-500">Port</span>folio
            </div>
            <p className="mt-1 text-xs text-zinc-500">Admin Dashboard</p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href || (item.href === '/admin' && pathname === '/admin');
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-violet-600/20 text-violet-400 border border-violet-600/30'
                      : 'text-zinc-400 hover:bg-zinc-900/50 hover:text-zinc-100'
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="border-t border-zinc-800 p-4 text-xs text-zinc-500">
            <p>© 2024 Portfolio. Admin v1.0</p>
          </div>
        </div>
      </motion.aside>
    </>
  );
}
