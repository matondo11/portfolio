'use client';

import { useEffect, useState } from 'react';
import { Feedback } from '@/types';

export default function FeedbackManager() {
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadFeedback();
  }, []);

  const loadFeedback = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      const headers = new Headers();
      if (token) headers.set('Authorization', `Bearer ${token}`);
      const res = await fetch('/api/feedback?all=true', { headers });
      const data = await res.json();
      if (res.ok && Array.isArray(data.feedback)) {
        setFeedback(data.feedback);
      } else {
        setError('Falha ao carregar depoimentos');
      }
    } catch (err) {
      setError('Erro ao buscar depoimentos');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id: string, approved: boolean) => {
    try {
      const token = localStorage.getItem('token');
      const headers = new Headers({ 'Content-Type': 'application/json' });
      if (token) headers.set('Authorization', `Bearer ${token}`);
      const res = await fetch(`/api/feedback/${id}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify({ approved }),
      });
      if (!res.ok) throw new Error('Falha ao atualizar status');
      loadFeedback();
    } catch (err) {
      setError((err as Error)?.message || 'Erro ao atualizar status');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Deseja excluir este depoimento?')) return;
    try {
      const token = localStorage.getItem('token');
      const headers = new Headers();
      if (token) headers.set('Authorization', `Bearer ${token}`);
      const res = await fetch(`/api/feedback/${id}`, { method: 'DELETE', headers });
      if (!res.ok) throw new Error('Falha ao excluir depoimento');
      loadFeedback();
    } catch (err) {
      setError((err as Error)?.message || 'Erro ao excluir depoimento');
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6 text-zinc-300">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-violet-400">Depoimentos</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">Lista de depoimentos</h2>
            <p className="mt-2 text-sm text-zinc-400">Modere e exclua comentários de visitantes.</p>
          </div>
          <button
            onClick={loadFeedback}
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
        ) : feedback.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-zinc-800 bg-zinc-950 p-8 text-center text-sm text-zinc-400">
            Nenhum depoimento encontrado.
          </div>
        ) : (
          feedback.map((entry) => (
            <div key={entry.id} className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-zinc-400">{entry.role}</p>
                  <h3 className="mt-2 text-lg font-semibold text-white">{entry.name}</h3>
                  <p className="mt-1 text-sm text-zinc-400">{entry.comment}</p>
                </div>
                <div className="space-y-2 text-right">
                  <p className="text-sm text-zinc-400">Rating: {entry.rating}/5</p>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">
                    {entry.approved ? 'Aprovado' : 'Pendente'}
                  </p>
                  <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
                    <button
                      onClick={() => handleApprove(entry.id, !entry.approved)}
                      className="rounded-3xl bg-violet-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-violet-500"
                    >
                      {entry.approved ? 'Reprovar' : 'Aprovar'}
                    </button>
                    <button
                      onClick={() => handleDelete(entry.id)}
                      className="rounded-3xl border border-white/10 bg-zinc-900 px-4 py-2 text-sm text-zinc-200 transition hover:bg-zinc-800"
                    >
                      Excluir
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
