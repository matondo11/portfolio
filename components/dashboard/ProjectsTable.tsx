'use client';

import { motion } from 'framer-motion';
import { ChevronDown, Copy, Edit, Trash2, ExternalLink, Eye, EyeOff, Star } from 'lucide-react';
import { useState, useMemo } from 'react';
import { Project, ProjectStatus } from '@/types';

interface ProjectsTableProps {
  projects: Project[];
  onEdit: (project: Project) => void;
  onDelete: (id: string) => void;
  onToggleHighlight: (id: string) => void;
  isLoading?: boolean;
}

const statusConfig: Record<ProjectStatus, { label: string; color: string }> = {
  production: { label: 'Production', color: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30' },
  'in-progress': { label: 'In Progress', color: 'bg-amber-500/15 text-amber-400 border-amber-500/30' },
  idea: { label: 'Idea', color: 'bg-slate-500/15 text-slate-400 border-slate-500/30' },
};

export function ProjectsTable({
  projects,
  onEdit,
  onDelete,
  onToggleHighlight,
  isLoading,
}: ProjectsTableProps) {
  const [sortBy, setSortBy] = useState<'name' | 'date' | 'status'>('date');
  const [filterStatus, setFilterStatus] = useState<'all' | ProjectStatus>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredProjects = useMemo(() => {
    const  filtered = projects.filter((p) => {
      const matchesSearch =
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.description?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
        (p.technologies?.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) || false);

      const matchesStatus = filterStatus === 'all' || p.status === filterStatus;

      return matchesSearch && matchesStatus;
    });

    filtered.sort((a, b) => {
      if (sortBy === 'name') {
        return a.title.localeCompare(b.title);
      } else if (sortBy === 'status') {
        return a.status.localeCompare(b.status);
      }
      return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
    });

    return filtered;
  }, [projects, sortBy, filterStatus, searchQuery]);

  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
  const paginatedProjects = filteredProjects.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
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
      className="rounded-xl border border-zinc-800 bg-zinc-900 overflow-hidden"
    >
      {/* Header */}
      <div className="border-b border-zinc-800 p-6 space-y-4">
        <h2 className="text-lg font-bold text-zinc-50">Todos os Projetos</h2>

        {/* Filters */}
        <div className="grid gap-4 md:grid-cols-3">
          <input
            type="search"
            placeholder="Buscar por nome, descrição ou tecnologia..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-2 text-sm text-zinc-100 placeholder-zinc-500 focus:border-zinc-700 focus:outline-none"
          />

          <select
            value={filterStatus}
            onChange={(e) => {
              setFilterStatus(e.target.value as 'all' | ProjectStatus);
              setCurrentPage(1);
            }}
            className="rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-2 text-sm text-zinc-100 focus:border-zinc-700 focus:outline-none"
          >
            <option value="all">Todos os status</option>
            <option value="production">Production</option>
            <option value="in-progress">In Progress</option>
            <option value="idea">Idea</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-2 text-sm text-zinc-100 focus:border-zinc-700 focus:outline-none"
          >
            <option value="date">Ordenar por data</option>
            <option value="name">Ordenar por nome</option>
            <option value="status">Ordenar por status</option>
          </select>
        </div>

        <p className="text-sm text-zinc-400">
          {filteredProjects.length} projeto{filteredProjects.length !== 1 ? 's' : ''} encontrado
          {filteredProjects.length > 0 ? 's' : ''}
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-zinc-800 bg-zinc-950/50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-bold text-zinc-400 uppercase tracking-wider">
                Nome
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-zinc-400 uppercase tracking-wider">
                Tecnologias
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-zinc-400 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-zinc-400 uppercase tracking-wider">
                Data
              </th>
              <th className="px-6 py-4 text-right text-xs font-bold text-zinc-400 uppercase tracking-wider">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i} className="animate-pulse">
                  <td colSpan={5} className="px-6 py-4">
                    <div className="h-4 bg-zinc-800 rounded w-full"></div>
                  </td>
                </tr>
              ))
            ) : paginatedProjects.length > 0 ? (
              paginatedProjects.map((project, idx) => (
                <motion.tr
                  key={project._id || project.id}
                  variants={itemVariants}
                  className="hover:bg-zinc-800/50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-zinc-100">{project.title}</p>
                      <p className="mt-1 text-xs text-zinc-500">
                        {project.description?.slice(0, 60)}...
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-1 flex-wrap">
                      {(project.technologies || []).slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full bg-zinc-800 px-2 py-1 text-xs text-zinc-400"
                        >
                          {tech}
                        </span>
                      ))}
                      {(project.technologies || []).length > 3 && (
                        <span className="rounded-full bg-zinc-800 px-2 py-1 text-xs text-zinc-400">
                          +{(project.technologies || []).length - 3}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold border ${statusConfig[project.status].color}`}>
                      {statusConfig[project.status].label}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-zinc-400">
                    {new Date(project.createdAt || 0).toLocaleDateString('pt-BR')}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => onEdit(project)}
                        className="rounded-lg p-2.5 sm:p-3 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100 transition-colors"
                        title="Editar"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => onToggleHighlight(project._id || project.id!)}
                        className="rounded-lg p-2.5 sm:p-3 text-zinc-400 hover:bg-zinc-800 hover:text-yellow-500 transition-colors"
                        title="Destacar"
                      >
                        <Star size={16} />
                      </button>
                      <button
                        onClick={() => onDelete(project._id || project.id!)}
                        className="rounded-lg p-2.5 sm:p-3 text-zinc-400 hover:bg-red-900/30 hover:text-red-400 transition-colors"
                        title="Deletar"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-zinc-500">
                  Nenhum projeto encontrado
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="border-t border-zinc-800 flex items-center justify-between px-6 py-4">
          <p className="text-sm text-zinc-400">
            Página {currentPage} de {totalPages}
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="rounded-lg border border-zinc-800 px-3 py-1 text-sm text-zinc-400 hover:border-zinc-700 hover:text-zinc-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Anterior
            </button>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="rounded-lg border border-zinc-800 px-3 py-1 text-sm text-zinc-400 hover:border-zinc-700 hover:text-zinc-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Próxima
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
}
