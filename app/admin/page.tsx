'use client';

import { useState, useEffect } from 'react';
import { LogOut, Plus, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';
import { Toaster } from 'sonner';
import { useQuery } from '@tanstack/react-query';
import { Project, ProjectStatus } from '@/types';
import AdminProjectForm from '@/components/AdminProjectForm';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { DashboardStatsCards } from '@/components/dashboard/DashboardStats';
import { AnalyticsCharts } from '@/components/dashboard/AnalyticsChart';
import { RecentActivity } from '@/components/dashboard/RecentActivity';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { ProjectsTable } from '@/components/dashboard/ProjectsTable';
import { LoadingCard, LoadingChart, LoadingTable } from '@/components/dashboard/shared/LoadingStates';
import { ActivityItem, DashboardStats, ProjectStats } from '@/types/dashboard';
import { useNotification } from '@/components/dashboard/hooks/useNotification';

export default function Admin() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | ProjectStatus>('all');
  const [isLoading, setIsLoading] = useState(false);
  const { notify } = useNotification();

  // Check login on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      fetchProjects();
    }
  }, []);

  // Fetch projects
  const fetchProjects = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/projects');
      const data = await res.json();
      setProjects(Array.isArray(data) ? data : data.projects || []);
      notify({
        type: 'success',
        title: 'Projetos carregados',
        message: 'Seus projetos foram atualizados com sucesso',
      });
    } catch (error) {
      notify({
        type: 'error',
        title: 'Erro ao carregar',
        message: 'Falha ao buscar projetos',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch dashboard stats using useQuery
  const {
    data: statsData,
    isLoading: statsLoading,
    error: statsError,
  } = useQuery<DashboardStats>({
    queryKey: ['dashboard', 'stats'],
    queryFn: async () => {
      const res = await fetch('/api/dashboard/stats');
      if (!res.ok) throw new Error('Failed to fetch stats');
      return res.json();
    },
    refetchInterval: 30000,
    retry: 1,
  });

  // Fetch analytics data using useQuery
  const {
    data: analyticsData,
    isLoading: analyticsLoading,
    error: analyticsError,
  } = useQuery<ProjectStats>({
    queryKey: ['dashboard', 'analytics'],
    queryFn: async () => {
      const res = await fetch('/api/dashboard/analytics');
      if (!res.ok) throw new Error('Failed to fetch analytics');
      return res.json();
    },
    retry: 1,
  });

  // Fetch activity data using useQuery
  const {
    data: activityData,
    isLoading: activityLoading,
    error: activityError,
  } = useQuery<ActivityItem[]>({
    queryKey: ['dashboard', 'activity'],
    queryFn: async () => {
      const res = await fetch('/api/dashboard/activity');
      if (!res.ok) throw new Error('Failed to fetch activity');
      return res.json();
    },
    retry: 1,
  });

  // Notify on errors
  useEffect(() => {
    if (statsError) {
      notify({
        type: 'error',
        title: 'Erro ao carregar estatísticas',
        message: 'Falha ao buscar dados de estatísticas',
      });
    }
  }, [statsError, notify]);

  useEffect(() => {
    if (analyticsError) {
      notify({
        type: 'error',
        title: 'Erro ao carregar analytics',
        message: 'Falha ao buscar dados de analytics',
      });
    }
  }, [analyticsError, notify]);

  useEffect(() => {
    if (activityError) {
      notify({
        type: 'error',
        title: 'Erro ao carregar atividades',
        message: 'Falha ao buscar atividades recentes',
      });
    }
  }, [activityError, notify]);

  // Handle login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData),
      });

      if (res.ok) {
        const { token } = await res.json();
        localStorage.setItem('token', token);
        setIsLoggedIn(true);
        setLoginData({ username: '', password: '' });
        fetchProjects();
        notify({
          type: 'success',
          title: 'Login realizado',
          message: 'Bem-vindo ao painel administrativo',
        });
      } else {
        const data = await res.json();
        notify({
          type: 'error',
          title: 'Falha no login',
          message: data?.error || 'Verifique suas credenciais',
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setProjects([]);
    notify({
      type: 'info',
      title: 'Logout realizado',
      message: 'Você foi desconectado do painel',
    });
  };

  // Handle delete
  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja deletar este projeto?')) return;

    try {
      const res = await fetch(`/api/projects/${id}`, { method: 'DELETE' });
      if (res.ok) {
        await fetchProjects();
        notify({
          type: 'success',
          title: 'Projeto deletado',
          message: 'O projeto foi removido com sucesso',
        });
      }
    } catch (e) {
      notify({
        type: 'error',
        title: 'Erro ao deletar',
        message: 'Falha ao deletar o projeto',
      });
    }
  };

  // Handle save
  const handleSaved = () => {
    fetchProjects();
    setEditingProject(null);
    notify({
      type: 'success',
      title: 'Projeto salvo',
      message: 'O projeto foi atualizado com sucesso',
    });
  };

  // Login page
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4 py-12">
        <Toaster position="top-center" theme="dark" />
        <motion.section
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-lg rounded-xl border border-zinc-800 bg-zinc-900/50 p-10 shadow-2xl backdrop-blur-xl"
        >
          <div className="mb-8 space-y-4 text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-zinc-500">
              Admin Portal
            </p>
            <h1 className="text-3xl font-bold text-zinc-50">Acesso ao Painel</h1>
            <p className="text-sm text-zinc-400">
              Entre com suas credenciais para gerenciar o portfólio
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">Usuário</label>
              <input
                type="text"
                value={loginData.username}
                onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
                placeholder="admin"
                className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-2 text-zinc-100 placeholder-zinc-600 focus:border-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-600/20"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">Senha</label>
              <input
                type="password"
                value={loginData.password}
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                placeholder="••••••••"
                className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-2 text-zinc-100 placeholder-zinc-600 focus:border-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-600/20"
              />
            </div>

            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={isLoading}
              className="w-full rounded-lg bg-gradient-to-r from-violet-600 to-violet-700 px-5 py-2 text-sm font-semibold text-white transition hover:shadow-lg hover:shadow-violet-600/20 disabled:opacity-50"
            >
              {isLoading ? 'Entrando...' : 'Entrar no Painel'}
            </motion.button>
          </form>
        </motion.section>
      </div>
    );
  }

  // Dashboard page
  return (
    <>
      <Toaster position="top-right" theme="dark" />
      <DashboardLayout>
        {/* Header Actions */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-4 mb-8 md:flex-row md:items-center md:justify-between"
        >
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-zinc-50">Dashboard</h1>
            <p className="mt-2 text-sm text-zinc-400">
              Bem-vindo! Aqui você gerencia todos os projetos do portfólio.
            </p>
          </div>

          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={fetchProjects}
              className="inline-flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2 text-sm font-semibold text-zinc-100 transition hover:border-zinc-700 hover:bg-zinc-800"
            >
              <RefreshCw size={18} />
              Atualizar
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="inline-flex items-center gap-2 rounded-lg border border-red-900/50 bg-red-900/20 px-4 py-2 text-sm font-semibold text-red-400 transition hover:bg-red-900/30"
            >
              <LogOut size={18} />
              Logout
            </motion.button>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <div className="mb-8">
          {statsLoading ? (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <LoadingCard key={i} />
              ))}
            </div>
          ) : statsData ? (
            <DashboardStatsCards stats={statsData} />
          ) : null}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-zinc-50 mb-4">Ações Rápidas</h2>
          <QuickActions
            actions={[
              {
                icon: <Plus size={20} />,
                label: 'Novo Projeto',
                description: 'Adicionar novo projeto',
                action: () => setEditingProject(null),
                color: 'from-violet-600 to-violet-500',
              },
              {
                icon: <RefreshCw size={20} />,
                label: 'Sincronizar',
                description: 'Atualizar dados',
                action: fetchProjects,
                color: 'from-cyan-600 to-cyan-500',
              },
              {
                icon: <LogOut size={20} />,
                label: 'Sair',
                description: 'Fazer logout',
                action: handleLogout,
                color: 'from-red-600 to-red-500',
              },
            ]}
          />
        </div>

        {/* Analytics Section */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-zinc-50 mb-4">Analytics</h2>
          {analyticsLoading ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <LoadingChart key={i} />
              ))}
            </div>
          ) : analyticsData ? (
            <AnalyticsCharts data={analyticsData} />
          ) : null}
        </div>

        {/* Recent Activity & Projects Table */}
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="text-lg font-bold text-zinc-50 mb-4">Todos os Projetos</h2>
            {isLoading ? (
              <LoadingTable />
            ) : (
              <ProjectsTable
                projects={projects}
                onEdit={(project) => setEditingProject(project)}
                onDelete={handleDelete}
                onToggleHighlight={() => {}}
              />
            )}
          </div>

          {/* Sidebar: Form + Activity */}
          <div className="space-y-6">
            {/* Form Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl border border-zinc-800 bg-zinc-900 p-6"
            >
              <div className="mb-4">
                <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">Formulário</p>
                <h3 className="mt-2 text-lg font-bold text-zinc-50">
                  {editingProject ? 'Editar Projeto' : 'Novo Projeto'}
                </h3>
              </div>
              <AdminProjectForm
                initial={editingProject}
                onCancel={() => setEditingProject(null)}
                onSaved={handleSaved}
              />
            </motion.div>

            {/* Recent Activity */}
            <RecentActivity activities={activityData || []} />
          </div>
        </div>
      </DashboardLayout>
    </>
  );
}
