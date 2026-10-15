'use client';

import { useState } from 'react';
import ImageUploader from './ImageUploader';

export default function MediaManager() {
  const [url, setUrl] = useState('');
  const [copied, setCopied] = useState(false);

  const copyUrl = async () => {
    if (!url) return;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
      <section className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
        <h2 className="text-xl font-semibold text-white">Enviar imagem</h2>
        <p className="mt-2 text-sm leading-6 text-zinc-400">As imagens são enviadas para o Cloudinary. Depois do envio, copie o link para usar no perfil ou em um projeto.</p>
        <div className="mt-6">
          <ImageUploader value={url} onChange={setUrl} label="Arquivo de imagem (máximo 10 MB)" />
        </div>
      </section>

      <section className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
        <h2 className="text-xl font-semibold text-white">Ativo selecionado</h2>
        {url ? (
          <>
            <p className="mt-2 text-sm text-zinc-400">Link permanente da imagem:</p>
            <input readOnly value={url} className="mt-4 w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-sm text-zinc-200" />
            <button type="button" onClick={copyUrl} className="mt-3 rounded-full bg-violet-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-500">
              {copied ? 'Link copiado' : 'Copiar link'}
            </button>
          </>
        ) : (
          <p className="mt-2 rounded-2xl border border-dashed border-zinc-800 p-6 text-sm text-zinc-500">Nenhuma imagem enviada nesta sessão.</p>
        )}
      </section>
    </div>
  );
}
