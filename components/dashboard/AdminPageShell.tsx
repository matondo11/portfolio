'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Toaster } from 'sonner';
import { DashboardLayout } from './DashboardLayout';

interface AdminPageShellProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

export function AdminPageShell({ title, description, children }: AdminPageShellProps) {
  const [hasCheckedAuth, setHasCheckedAuth] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(Boolean(token));
    setHasCheckedAuth(true);
  }, []);

  if (!hasCheckedAuth) {
    return null;
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-xl rounded-3xl border border-zinc-800 bg-zinc-900/95 p-10 text-center shadow-2xl">
          <p className="text-sm uppercase tracking-[0.3em] text-violet-400 mb-4">Área administrativa</p>
          <h1 className="text-3xl font-bold text-white mb-3">Acesso restrito</h1>
          <p className="text-zinc-400 mb-8">
            Você precisa entrar no painel administrativo para acessar esta página.
          </p>
          <Link href="/admin" className="inline-flex rounded-full bg-violet-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-violet-500">
            Ir para login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Toaster position="top-right" theme="dark" />
      <DashboardLayout>
        <div className="space-y-6">
          <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
            <p className="text-sm uppercase tracking-[0.3em] text-violet-400">{title}</p>
            <h1 className="mt-3 text-3xl font-bold text-white">{title}</h1>
            <p className="mt-2 text-sm text-zinc-400 max-w-3xl">{description}</p>
          </div>
          {children}
        </div>
      </DashboardLayout>
    </>
  );
}
