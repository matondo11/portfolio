'use client';

import { useEffect, useState } from 'react';
import { Skill } from '@/types';

interface Props {
  initial?: Skill | null;
  onSaved: (skill: Skill) => void;
  onCancel?: () => void;
}

export default function SkillForm({ initial = null, onSaved, onCancel }: Props) {
  const [name, setName] = useState(initial?.name || '');
  const [level, setLevel] = useState<Skill['level']>(initial?.level || 'mastered');
  const [proficiency, setProficiency] = useState(initial?.proficiency ?? 80);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    setName(initial?.name || '');
    setLevel(initial?.level || 'mastered');
    setProficiency(initial?.proficiency ?? 80);
  }, [initial]);

  const mode = initial?._id ? 'update' : 'create';
  const buttonLabel = mode === 'update' ? 'Atualizar habilidade' : 'Salvar habilidade';

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const payload = { name, level, proficiency };
      const url = initial?._id ? `/api/skills/${initial._id}` : '/api/skills';
      const res = await fetch(url, {
        method: mode === 'update' ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'Erro ao salvar habilidade');
      setSuccess(mode === 'update' ? 'Habilidade atualizada com sucesso' : 'Habilidade salva com sucesso');
      onSaved(data);
    } catch (err) {
      setError((err as Error)?.message || 'Falha ao salvar habilidade');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 rounded-3xl border border-zinc-800 bg-zinc-950 p-6 text-zinc-300">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-violet-400">{mode === 'update' ? 'Editar habilidade' : 'Nova habilidade'}</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">{buttonLabel}</h2>
        </div>
        {initial?._id && (
          <span className="rounded-full bg-zinc-900 px-3 py-1 text-xs uppercase text-zinc-400">Editando</span>
        )}
      </div>

      {error && <div className="rounded-2xl bg-red-500/10 px-4 py-3 text-sm text-red-200">{error}</div>}
      {success && <div className="rounded-2xl bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">{success}</div>}

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm text-zinc-300">
          Nome
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-2 w-full rounded-3xl border border-white/10 bg-zinc-900 px-4 py-3 text-white outline-none focus:border-violet-500"
          />
        </label>
        <label className="block text-sm text-zinc-300">
          Categoria
          <select
            value={level}
            onChange={(e) => setLevel(e.target.value as Skill['level'])}
            className="mt-2 w-full rounded-3xl border border-white/10 bg-zinc-900 px-4 py-3 text-white outline-none focus:border-violet-500"
          >
            <option value="mastered">Mastered</option>
            <option value="learning">Learning</option>
            <option value="planned">Planned</option>
          </select>
        </label>
      </div>

      <label className="block text-sm text-zinc-300">
        Proficiência (%)
        <input
          type="number"
          min={0}
          max={100}
          value={proficiency}
          onChange={(e) => setProficiency(Number(e.target.value))}
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
