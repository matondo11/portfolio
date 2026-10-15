'use client';

import { useEffect, useState } from 'react';
import { Service } from '@/types';
import ServiceForm from './ServiceForm';

export default function ServiceManager() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Service | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadServices() {
      try {
        const res = await fetch('/api/services');
        const data = await res.json();
        if (res.ok && Array.isArray(data)) {
          setServices(data);
        } else {
          setError('Falha ao carregar serviços');
        }
      } catch (err) {
        setError('Erro ao buscar serviços');
      } finally {
        setLoading(false);
      }
    }

    loadServices();
  }, []);

  const refresh = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/services');
      const data = await res.json();
      if (res.ok && Array.isArray(data)) {
        setServices(data);
      } else {
        setError('Falha ao atualizar serviços');
      }
    } catch (err) {
      setError('Erro ao atualizar serviços');
    } finally {
      setLoading(false);
    }
  };

  const handleSaved = (service: Service) => {
    setSelected(null);
    refresh();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Excluir este serviço?')) return;
    try {
      const token = localStorage.getItem('token');
      const headers = new Headers();
      if (token) headers.set('Authorization', `Bearer ${token}`);
      const res = await fetch(`/api/services/${id}`, { method: 'DELETE', headers });
      if (!res.ok) throw new Error('Falha ao excluir');
      refresh();
    } catch (err) {
      setError((err as Error)?.message || 'Erro ao excluir serviço');
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
      <div className="space-y-6">
        <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6 text-zinc-300">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-violet-400">Serviços</p>
              <h2 className="mt-2 text-2xl font-semibold text-white">Lista de serviços</h2>
              <p className="mt-2 text-sm text-zinc-400">Edite ou exclua serviços que aparecem na página principal.</p>
            </div>
            <button
              onClick={refresh}
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
          ) : services.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-zinc-800 bg-zinc-950 p-8 text-center text-sm text-zinc-400">
              Nenhum serviço encontrado.
            </div>
          ) : (
            services.map((service) => (
              <div key={service._id} className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-zinc-400">Ícone: {service.icon}</p>
                    <h3 className="mt-2 text-lg font-semibold text-white">{service.title}</h3>
                    <p className="mt-1 text-sm text-zinc-400">{service.description}</p>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setSelected(service)}
                      className="rounded-3xl bg-violet-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-violet-500"
                    >
                      Editar
                    </button>
                    {service._id && (
                      <button
                        onClick={() => handleDelete(service._id!)}
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
        <ServiceForm initial={selected} onSaved={handleSaved} onCancel={() => setSelected(null)} />
      </div>
    </div>
  );
}
