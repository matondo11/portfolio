'use client';

import { useEffect, useState } from 'react';
import { Service } from '@/types';

interface Props {
  initial?: Service | null;
  onSaved: (service: Service) => void;
  onCancel?: () => void;
}

export default function ServiceForm({ initial = null, onSaved, onCancel }: Props) {
  const [title, setTitle] = useState(initial?.title || '');
  const [description, setDescription] = useState(initial?.description || '');
  const [icon, setIcon] = useState(initial?.icon || 'Code');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    setTitle(initial?.title || '');
    setDescription(initial?.description || '');
    setIcon(initial?.icon || 'Code');
  }, [initial]);

  const mode = initial?._id ? 'update' : 'create';
  const buttonLabel = mode === 'update' ? 'Atualizar serviço' : 'Salvar serviço';

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const payload = { title, description, icon };
      const url = initial?._id ? `/api/services/${initial._id}` : '/api/services';
      const token = localStorage.getItem('token');
      const headers = new Headers({ 'Content-Type': 'application/json' });
      if (token) headers.set('Authorization', `Bearer ${token}`);
      const res = await fetch(url, {
        method: mode === 'update' ? 'PUT' : 'POST',
        headers,
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'Erro ao salvar serviço');
      setSuccess(mode === 'update' ? 'Serviço atualizado com sucesso' : 'Serviço salvo com sucesso');
      onSaved(data);
    } catch (err) {
      setError((err as Error)?.message || 'Falha ao salvar serviço');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 rounded-3xl border border-zinc-800 bg-zinc-950 p-6 text-zinc-300">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-violet-400">{mode === 'update' ? 'Editar serviço' : 'Novo serviço'}</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">{buttonLabel}</h2>
        </div>
        {initial?._id && (
          <span className="rounded-full bg-zinc-900 px-3 py-1 text-xs uppercase text-zinc-400">Editando</span>
        )}
      </div>

      {error && <div className="rounded-2xl bg-red-500/10 px-4 py-3 text-sm text-red-200">{error}</div>}
      {success && <div className="rounded-2xl bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">{success}</div>}

      <label className="block text-sm text-zinc-300">
        Título
        <input
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-2 w-full rounded-3xl border border-white/10 bg-zinc-900 px-4 py-3 text-white outline-none focus:border-violet-500"
        />
      </label>

      <label className="block text-sm text-zinc-300">
        Descrição
        <textarea
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          className="mt-2 w-full rounded-3xl border border-white/10 bg-zinc-900 px-4 py-3 text-white outline-none focus:border-violet-500"
        />
      </label>

      <label className="block text-sm text-zinc-300">
        Ícone
        <input
          value={icon}
          onChange={(e) => setIcon(e.target.value)}
          placeholder="Code, Server, Palette"
          className="mt-2 w-full rounded-3xl border border-white/10 bg-zinc-900 px-4 py-3 text-white outline-none focus:border-violet-500"
        />
      </label>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-3xl border border-white/10 bg-zinc-900 px-6 py-3 text-sm text-zinc-200 transition hover:bg-zinc-800"
          >
            Cancelar
          </button>
        )}
        <button
          type="submit"
          disabled={loading}
          className="rounded-3xl bg-violet-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? 'Salvando...' : buttonLabel}
        </button>
      </div>
    </form>
  );
}
