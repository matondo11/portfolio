'use client';

import { AdminPageShell } from '@/components/dashboard/AdminPageShell';
import Link from 'next/link';

export default function AdminSettingsPage() {
  return (
    <AdminPageShell
      title="Configurações"
      description="Defina informações do site, contatos, SEO e preferências de exibição."
    >
      <div className="grid gap-6 md:grid-cols-2">
        <section className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6 text-zinc-300">
          <h2 className="text-xl font-semibold text-white">Identidade e SEO</h2>
          <p className="mt-3 leading-relaxed text-zinc-400">O título e a descrição padrão do site estão definidos no layout do projeto. Atualize nome, cargo, resumo, contatos e links sociais no perfil; esses dados alimentam a apresentação pública.</p>
          <Link href="/admin/profile" className="mt-5 inline-flex rounded-full bg-violet-600 px-5 py-3 text-sm font-semibold text-white">Editar perfil</Link>
        </section>
        <section className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6 text-zinc-300">
          <h2 className="text-xl font-semibold text-white">Sessão administrativa</h2>
          <p className="mt-3 leading-relaxed text-zinc-400">As operações de escrita usam token Bearer com validade limitada. Se o acesso expirar, saia do painel e entre novamente.</p>
          <Link href="/admin" className="mt-5 inline-flex rounded-full border border-zinc-700 px-5 py-3 text-sm font-semibold text-zinc-200">Voltar ao painel</Link>
        </section>
      </div>
    </AdminPageShell>
  );
}
