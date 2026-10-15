'use client';

import { useCallback, useEffect, useState } from 'react';
import { TimelineItem } from '@/types';

interface TimelineManagerProps {
  category: TimelineItem['category'];
}

const emptyForm = { title: '', subtitle: '', date: '', content: '', order: 0 };

export default function TimelineManager({ category }: TimelineManagerProps) {
  const [items, setItems] = useState<TimelineItem[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const requestHeaders = useCallback((json = false) => {
    const headers = new Headers();
    const token = localStorage.getItem('token');
    if (token) headers.set('Authorization', `Bearer ${token}`);
    if (json) headers.set('Content-Type', 'application/json');
    return headers;
  }, []);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/timeline?category=${category}`);
      const data = await response.json();
      if (!response.ok || !Array.isArray(data)) throw new Error(data?.error || 'Falha ao carregar registros');
      setItems(data);
    } catch (err) {
      setError((err as Error)?.message || 'Falha ao carregar registros');
    } finally {
      setLoading(false);
    }
  }, [category]);

  useEffect(() => { void refresh(); }, [refresh]);

  const resetForm = () => {
    setEditingId(null);
    setForm(emptyForm);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const response = await fetch(editingId ? `/api/timeline/${editingId}` : '/api/timeline', {
        method: editingId ? 'PUT' : 'POST',
        headers: requestHeaders(true),
        body: JSON.stringify({ ...form, category }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.error || 'Falha ao salvar registro');
      resetForm();
      await refresh();
    } catch (err) {
      setError((err as Error)?.message || 'Falha ao salvar registro');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Excluir este registro?')) return;
    try {
      const response = await fetch(`/api/timeline/${id}`, { method: 'DELETE', headers: requestHeaders() });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.error || 'Falha ao excluir registro');
      await refresh();
    } catch (err) {
      setError((err as Error)?.message || 'Falha ao excluir registro');
    }
  };

  const handleEdit = (item: TimelineItem) => {
    if (!item._id) return;
    setEditingId(item._id);
    setForm({
      title: item.title,
      subtitle: item.subtitle || '',
      date: item.date || '',
      content: item.content || '',
      order: item.order || 0,
    });
  };

  const heading = category === 'experience' ? 'Experiência profissional' : 'Formação e cursos';

  return (
    <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
      <section className="space-y-4 rounded-3xl border border-zinc-800 bg-zinc-950 p-6 text-zinc-200">
        <div className="flex items-center justify-between gap-4">
          <div><h2 className="text-xl font-semibold text-white">{heading}</h2><p className="mt-1 text-sm text-zinc-400">Os registros são exibidos no portfólio público.</p></div>
          <button type="button" onClick={() => void refresh()} className="rounded-full bg-zinc-800 px-4 py-2 text-sm">Atualizar</button>
        </div>
        {error && <p role="alert" className="rounded-xl bg-red-500/10 p-3 text-sm text-red-200">{error}</p>}
        {loading ? <div className="h-24 animate-pulse rounded-2xl bg-zinc-900" /> : items.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-zinc-800 p-6 text-center text-sm text-zinc-400">Nenhum registro cadastrado.</p>
        ) : items.map((item) => (
          <article key={item._id} className="rounded-2xl border border-zinc-800 p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div><p className="text-xs uppercase tracking-widest text-violet-300">{item.date}</p><h3 className="mt-2 font-semibold text-white">{item.title}</h3>{item.subtitle && <p className="text-sm text-zinc-300">{item.subtitle}</p>}</div>
              <div className="flex gap-2"><button type="button" onClick={() => handleEdit(item)} className="rounded-full bg-violet-600 px-3 py-2 text-xs font-semibold">Editar</button>{item._id && <button type="button" onClick={() => void handleDelete(item._id!)} className="rounded-full border border-zinc-700 px-3 py-2 text-xs">Excluir</button>}</div>
            </div>
            {item.content && <p className="mt-3 whitespace-pre-line text-sm leading-6 text-zinc-400">{item.content}</p>}
          </article>
        ))}
      </section>

      <form onSubmit={handleSubmit} className="space-y-4 rounded-3xl border border-zinc-800 bg-zinc-950 p-6 text-zinc-200">
        <h2 className="text-xl font-semibold text-white">{editingId ? 'Editar registro' : 'Adicionar registro'}</h2>
        <label className="block text-sm">Título<input required value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} className="mt-2 w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-white" /></label>
        <label className="block text-sm">Instituição ou organização<input value={form.subtitle} onChange={(event) => setForm({ ...form, subtitle: event.target.value })} className="mt-2 w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-white" /></label>
        <label className="block text-sm">Período<input value={form.date} onChange={(event) => setForm({ ...form, date: event.target.value })} placeholder="2023 — atual" className="mt-2 w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-white" /></label>
        <label className="block text-sm">Descrição<textarea rows={5} value={form.content} onChange={(event) => setForm({ ...form, content: event.target.value })} className="mt-2 w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-white" /></label>
        <label className="block text-sm">Ordem<input type="number" value={form.order} onChange={(event) => setForm({ ...form, order: Number(event.target.value) })} className="mt-2 w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-white" /></label>
        <div className="flex gap-3"><button disabled={saving} className="rounded-full bg-violet-600 px-5 py-3 text-sm font-semibold disabled:opacity-50">{saving ? 'Salvando...' : editingId ? 'Atualizar' : 'Salvar'}</button>{editingId && <button type="button" onClick={resetForm} className="rounded-full border border-zinc-700 px-5 py-3 text-sm">Cancelar edição</button>}</div>
      </form>
    </div>
  );
}