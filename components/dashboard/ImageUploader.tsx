"use client";

import { useState } from 'react';

interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

function resizeImage(file: File, maxWidth = 1200): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const ratio = img.width / img.height;
      const width = Math.min(img.width, maxWidth);
      const height = Math.round(width / ratio);

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (!ctx) return reject(new Error('Canvas not supported'));
      ctx.drawImage(img, 0, 0, width, height);
      canvas.toBlob(
        (blob) => {
          if (!blob) return reject(new Error('Failed to create blob'));
          resolve(blob);
        },
        'image/jpeg',
        0.85
      );
    };
    img.onerror = (e) => reject(e);
    img.src = URL.createObjectURL(file);
  });
}

export default function ImageUploader({ value, onChange, label }: ImageUploaderProps) {
  const [preview, setPreview] = useState<string>(value || '');
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setError(null);
    try {
      setUploading(true);
      const blob = await resizeImage(file);
      const form = new FormData();
      form.append('file', new File([blob], file.name, { type: 'image/jpeg' }));

      const res = await fetch('/api/upload', { method: 'POST', body: form });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'Upload failed');
      setPreview(data.url);
      onChange(data.url);
    } catch (err) {
      setError((err as Error)?.message || 'Erro no upload');
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="space-y-2">
      {label && <label className="text-sm text-zinc-300">{label}</label>}
      <div className="rounded-2xl border border-white/10 bg-zinc-950 p-3">
        {preview ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={preview} alt={label || 'preview'} className="w-full h-44 object-cover rounded-md mb-3" />
        ) : (
          <div className="h-44 w-full rounded-md bg-zinc-900 flex items-center justify-center text-sm text-zinc-500 mb-3">
            Sem imagem definida
          </div>
        )}

        <div className="flex items-center gap-3">
          <label className="inline-flex items-center gap-2 rounded-3xl bg-linear-to-r from-violet-600 to-cyan-500 px-4 py-2 text-sm font-semibold text-white cursor-pointer">
            {uploading ? 'Enviando...' : 'Selecionar imagem'}
            <input type="file" accept="image/*" onChange={handleFile} className="hidden" />
          </label>
          {error && <span className="text-sm text-red-400">{error}</span>}
        </div>
      </div>
    </div>
  );
}
