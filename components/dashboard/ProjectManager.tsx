'use client';

import { useEffect, useState } from 'react';
import { Project } from '@/types';
import AdminProjectForm from '@/components/AdminProjectForm';

export default function ProjectManager() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    refreshProjects();
  }, []);

  const refreshProjects = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      const headers = new Headers();
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      const res = await fetch('/api/projects?includeDrafts=true', { headers });
      const data = await res.json();
      if (res.ok && Array.isArray(data)) {
        setProjects(data);
      } else {
        setError('Falha ao carregar projetos');
      }
    } catch (err) {
      setError('Erro ao buscar projetos');
    } finally {
      setLoading(false);
    }
  };

  const handleSaved = (project: Project) => {
    setEditingProject(null);
    refreshProjects();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este projeto?')) return;
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      const headers = new Headers();
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      const res = await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
        headers,
      });
      if (!res.ok) throw new Error('Falha ao excluir projeto');
      refreshProjects();
    } catch (err) {
      setError((err as Error)?.message || 'Erro ao excluir projeto');
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
      <div className="space-y-6">
        <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6 text-zinc-300">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-violet-400">Projetos</p>
              <h2 className="mt-2 text-2xl font-semibold text-white">Lista de projetos</h2>
              <p className="mt-2 text-sm text-zinc-400">Edite ou exclua os cases disponíveis no portfólio.</p>
            </div>
            <button
              onClick={refreshProjects}
              className="rounded-3xl bg-zinc-900 px-5 py-3 text-sm text-zinc-200 transition hover:bg-zinc-800"
            >
              Atualizar
            </button>
          </div>
        </div>

        {error && <div className="rounded-3xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-200">{error}</div>}

        <div className="space-y-4">
          {loading ? (
            Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="h-28 rounded-3xl bg-zinc-900/80 animate-pulse" />
            ))
          ) : projects.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-zinc-800 bg-zinc-950 p-8 text-center text-sm text-zinc-400">
              Nenhum projeto encontrado.
            </div>
          ) : (
            projects.map((project) => (
              <div key={project._id ?? project.id} className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-zinc-400">{project.status} · {project.published === false ? 'Rascunho' : 'Publicado'}</p>
                    <h3 className="mt-2 text-lg font-semibold text-white">{project.title}</h3>
                    <p className="mt-1 text-sm text-zinc-400 line-clamp-2">{project.description}</p>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setEditingProject(project)}
                      className="rounded-3xl bg-violet-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-violet-500"
                    >
                      Editar
                    </button>
                    {(project._id || project.id) && (
                      <button
                        onClick={() => handleDelete(project._id || project.id!)}
                        className="rounded-3xl border border-white/10 bg-zinc-900 px-4 py-2 text-sm text-zinc-200 transition hover:bg-zinc-800"
                      >
                        Excluir
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div>
        <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6 text-zinc-300">
          <p className="text-sm uppercase tracking-[0.3em] text-violet-400">Formulário</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">{editingProject ? 'Editar projeto' : 'Novo projeto'}</h2>
        </div>
        <div className="mt-6">
          <AdminProjectForm
            initial={editingProject}
            onCancel={() => setEditingProject(null)}
            onSaved={handleSaved}
          />
        </div>
      </div>
    </div>
  );
}
