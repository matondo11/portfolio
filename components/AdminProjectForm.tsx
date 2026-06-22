"use client";

import { useState, useEffect } from "react";
import { Project } from "@/types";

interface Props {
  initial?: Partial<Project> | null;
  onCancel?: () => void;
  onSaved: (project: Project) => void;
}

export default function AdminProjectForm({ initial = null, onCancel, onSaved }: Props) {
  const [title, setTitle] = useState(initial?.title || "");
  const [description, setDescription] = useState(initial?.description || "");
  const [technologies, setTechnologies] = useState((initial?.technologies || []).join(", "));
  const [liveUrl, setLiveUrl] = useState(initial?.liveUrl || "");
  const [githubUrl, setGithubUrl] = useState(initial?.githubUrl || "");
  const [imageUrl, setImageUrl] = useState(initial?.image || "");
  const [status, setStatus] = useState(initial?.status || "production");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    setTitle(initial?.title || "");
    setDescription(initial?.description || "");
    setTechnologies((initial?.technologies || []).join(", "));
    setLiveUrl(initial?.liveUrl || "");
    setGithubUrl(initial?.githubUrl || "");
    setImageUrl(initial?.image || "");
    setStatus(initial?.status || "production");
  }, [initial]);

  const buildPayload = () => ({
    title,
    description,
    technologies: technologies.split(",").map((t) => t.trim()).filter(Boolean),
    image: imageUrl || undefined,
    liveUrl: liveUrl || undefined,
    githubUrl: githubUrl || undefined,
    status,
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const payload = buildPayload();
      let res;
      if ((initial as any)?._id || (initial as any)?.id) {
        const id = (initial as any)._id || (initial as any).id;
        res = await fetch(`/api/projects/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch(`/api/projects`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Erro ao salvar");
      setSuccess('Projeto salvo com sucesso');
      onSaved(data);
    } catch (err) {
      console.error(err);
      setError((err as any)?.message || 'Falha ao salvar projeto');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="rounded-[1.8rem] border border-white/10 bg-slate-950/90 p-6 shadow-lg shadow-slate-950/30">
        <div className="space-y-4">
          {error && <div className="rounded-2xl bg-red-500/10 px-4 py-3 text-sm text-red-200">{error}</div>}
          {success && <div className="rounded-2xl bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">{success}</div>}

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm text-slate-300">
              Título <span className="text-amber-300">*</span>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Nome do projeto"
                className="mt-2 w-full rounded-3xl border border-white/10 bg-slate-950/90 px-4 py-3 text-white outline-none transition focus:border-accent"
                required
              />
            </label>
            <label className="block text-sm text-slate-300">
              Status
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="mt-2 w-full rounded-3xl border border-white/10 bg-slate-950/90 px-4 py-3 text-white outline-none transition focus:border-accent"
              >
                <option value="production">Production</option>
                <option value="in-progress">In Progress</option>
                <option value="idea">Idea</option>
              </select>
            </label>
          </div>

          <label className="block text-sm text-slate-300">
            Descrição <span className="text-amber-300">*</span>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descrição resumida para o card"
              className="mt-2 min-h-[130px] w-full rounded-3xl border border-white/10 bg-slate-950/90 px-4 py-3 text-white outline-none transition focus:border-accent"
              required
            />
          </label>

          <div className="grid gap-4">
            <label className="block text-sm text-slate-300">
              Tecnologias
              <input
                value={technologies}
                onChange={(e) => setTechnologies(e.target.value)}
                placeholder="React, TypeScript, Node"
                className="mt-2 w-full rounded-3xl border border-white/10 bg-slate-950/90 px-4 py-3 text-white outline-none transition focus:border-accent"
              />
            </label>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-sm text-slate-300">
                Imagem
                <input
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="URL da imagem (opcional)"
                  className="mt-2 w-full rounded-3xl border border-white/10 bg-slate-950/90 px-4 py-3 text-white outline-none transition focus:border-accent"
                />
              </label>
              <label className="block text-sm text-slate-300">
                GitHub
                <input
                  value={githubUrl}
                  onChange={(e) => setGithubUrl(e.target.value)}
                  placeholder="https://github.com/..."
                  className="mt-2 w-full rounded-3xl border border-white/10 bg-slate-950/90 px-4 py-3 text-white outline-none transition focus:border-accent"
                />
              </label>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-sm text-slate-300">
                Demo
                <input
                  value={liveUrl}
                  onChange={(e) => setLiveUrl(e.target.value)}
                  placeholder="https://..."
                  className="mt-2 w-full rounded-3xl border border-white/10 bg-slate-950/90 px-4 py-3 text-white outline-none transition focus:border-accent"
                />
              </label>
            </div>
          </div>

          {imageUrl && (
            <div className="rounded-3xl border border-white/10 bg-slate-950/90 p-4">
              <p className="text-sm text-slate-400">Pré-visualização da imagem</p>
              <div className="mt-3 overflow-hidden rounded-3xl border border-white/10 bg-slate-900">
                <img src={imageUrl} alt="Preview" className="h-48 w-full object-cover" />
              </div>
            </div>
          )}

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center rounded-3xl bg-accent px-6 py-3 text-sm font-semibold text-white transition hover:bg-accent/90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? 'Salvando...' : 'Salvar projeto'}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="inline-flex items-center justify-center rounded-3xl border border-white/10 bg-slate-950/90 px-6 py-3 text-sm text-slate-200 transition hover:bg-slate-900"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
