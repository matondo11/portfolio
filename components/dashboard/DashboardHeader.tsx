'use client';

import { motion } from 'framer-motion';
import { Bell, Search, Command } from 'lucide-react';
import { useState, useEffect } from 'react';

export function DashboardHeader() {
  const [showCommandPalette, setShowCommandPalette] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setShowCommandPalette(!showCommandPalette);
      }
      if (e.key === 'Escape') {
        setShowCommandPalette(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showCommandPalette]);

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-20 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-sm"
      >
        <div className="flex items-center justify-between px-4 py-4 md:px-8">
          {/* Search Bar */}
          <div className="hidden flex-1 md:block md:max-w-md">
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
              <input
                type="search"
                placeholder="Buscar projetos, feedbacks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-zinc-800 bg-zinc-900 pl-10 pr-4 py-2 text-sm text-zinc-100 placeholder-zinc-500 transition-colors focus:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-violet-600/20"
              />
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            {/* Command Palette Trigger */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowCommandPalette(true)}
              className="hidden rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 text-xs text-zinc-400 transition-colors hover:border-zinc-700 hover:text-zinc-100 lg:flex items-center gap-2"
            >
              <Command size={16} />
              <span>Ctrl K</span>
            </motion.button>

            {/* Notifications */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative rounded-lg p-2 text-zinc-400 transition-colors hover:bg-zinc-900 hover:text-zinc-100"
            >
              <Bell size={20} />
              <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-violet-600"></span>
            </motion.button>

            {/* User Avatar */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="h-10 w-10 rounded-full bg-gradient-to-br from-violet-600 to-cyan-600 flex items-center justify-center text-sm font-bold text-white"
            >
              AD
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Command Palette */}
      {showCommandPalette && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowCommandPalette(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl rounded-xl border border-zinc-800 bg-zinc-900 shadow-2xl"
          >
            <div className="border-b border-zinc-800 p-4">
              <input
                type="text"
                placeholder="Buscar comandos, projetos, páginas..."
                autoFocus
                className="w-full bg-transparent text-lg text-zinc-100 placeholder-zinc-500 outline-none"
              />
            </div>
            <div className="max-h-96 overflow-y-auto p-4 space-y-2">
              {[
                { icon: '➕', label: 'Novo Projeto', desc: 'Criar novo projeto' },
                { icon: '📁', label: 'Ir para Uploads', desc: 'Página de uploads' },
                { icon: '📊', label: 'Analytics', desc: 'Ver analytics' },
                { icon: '⚙️', label: 'Configurações', desc: 'Abrir configurações' },
              ].map((item) => (
                <div
                  key={item.label}
                  className="cursor-pointer rounded-lg px-4 py-3 hover:bg-zinc-800 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{item.icon}</span>
                    <div>
                      <p className="text-sm font-medium text-zinc-100">{item.label}</p>
                      <p className="text-xs text-zinc-500">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}
