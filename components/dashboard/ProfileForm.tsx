'use client';

import { useEffect, useState } from 'react';
import ImageUploader from './ImageUploader';

interface SocialLinks {
  github: string;
  linkedin: string;
  twitter: string;
  website: string;
}

interface ProfileFormState {
  photo: string;
  banner: string;
  name: string;
  role: string;
  summary: string;
  about: string;
  location: string;
  availability: string;
  email: string;
  whatsapp: string;
  resumeUrl: string;
  socialLinks: SocialLinks;
}

const defaultState: ProfileFormState = {
  photo: '',
  banner: '',
  name: '',
  role: '',
  summary: '',
  about: '',
  location: '',
  availability: '',
  email: '',
  whatsapp: '',
  resumeUrl: '',
  socialLinks: {
    github: '',
    linkedin: '',
    twitter: '',
    website: '',
  },
};

export default function ProfileForm() {
  const [profile, setProfile] = useState<ProfileFormState>(defaultState);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    async function loadProfile() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch('/api/profile');
        const data = await res.json();
        if (res.ok) {
          setProfile({
            photo: data.photo || '',
            banner: data.banner || '',
            name: data.name || '',
            role: data.role || '',
            summary: data.summary || '',
            about: data.about || '',
            location: data.location || '',
            availability: data.availability || '',
            email: data.email || '',
            whatsapp: data.whatsapp || '',
            resumeUrl: data.resumeUrl || '',
            socialLinks: {
              github: data.socialLinks?.github || '',
              linkedin: data.socialLinks?.linkedin || '',
              twitter: data.socialLinks?.twitter || '',
              website: data.socialLinks?.website || '',
            },
          });
        } else {
          setError(data?.error || 'Falha ao carregar perfil.');
        }
      } catch (err) {
        setError('Erro ao buscar dados do perfil.');
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, []);

  const updateField = (field: keyof ProfileFormState, value: string) => {
    setProfile((current) => ({ ...current, [field]: value }));
  };

  const updateSocialField = (field: keyof SocialLinks, value: string) => {
    setProfile((current) => ({
      ...current,
      socialLinks: {
        ...current.socialLinks,
        [field]: value,
      },
    }));
  };

  const submitProfile = async (event: React.FormEvent) => {
    event.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      const res = await fetch('/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(profile),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error || 'Falha ao salvar perfil.');
      }
      setProfile({
        photo: data.photo || '',
        banner: data.banner || '',
        name: data.name || '',
        role: data.role || '',
        summary: data.summary || '',
        about: data.about || '',
        location: data.location || '',
        availability: data.availability || '',
        email: data.email || '',
        whatsapp: data.whatsapp || '',
        resumeUrl: data.resumeUrl || '',
        socialLinks: {
          github: data.socialLinks?.github || '',
          linkedin: data.socialLinks?.linkedin || '',
          twitter: data.socialLinks?.twitter || '',
          website: data.socialLinks?.website || '',
        },
      });
      setSuccess('Perfil atualizado com sucesso.');
    } catch (err) {
      setError((err as Error)?.message || 'Erro desconhecido.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={submitProfile} className="space-y-8">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4 rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
          <h2 className="text-xl font-semibold text-white">Identidade</h2>
          <p className="text-sm text-zinc-500">Atualize a foto, o banner e os dados principais do seu perfil.</p>

          <div className="grid gap-4">
            <ImageUploader
              value={profile.photo}
              onChange={(url) => updateField('photo', url)}
              label="Foto de perfil"
            />

            <ImageUploader
              value={profile.banner}
              onChange={(url) => updateField('banner', url)}
              label="Banner de destaque"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm text-zinc-300">
              Nome
              <input
                type="text"
                value={profile.name}
                onChange={(e) => updateField('name', e.target.value)}
                className="mt-2 w-full rounded-3xl border border-white/10 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-accent"
              />
            </label>
            <label className="block text-sm text-zinc-300">
              Cargo
              <input
                type="text"
                value={profile.role}
                onChange={(e) => updateField('role', e.target.value)}
                className="mt-2 w-full rounded-3xl border border-white/10 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-accent"
              />
            </label>
          </div>

          <label className="block text-sm text-zinc-300">
            Resumo
            <textarea
              value={profile.summary}
              onChange={(e) => updateField('summary', e.target.value)}
              rows={4}
              className="mt-2 w-full rounded-3xl border border-white/10 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-accent"
            />
          </label>

          <label className="block text-sm text-zinc-300">
            Sobre mim
            <textarea
              value={profile.about}
              onChange={(e) => updateField('about', e.target.value)}
              rows={6}
              className="mt-2 w-full rounded-3xl border border-white/10 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-accent"
            />
          </label>
        </div>

        <div className="space-y-4 rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
          <h2 className="text-xl font-semibold text-white">Contatos & extras</h2>
          <p className="text-sm text-zinc-500">Configurações de localização, disponibilidade, currículo e redes sociais.</p>

          <label className="block text-sm text-zinc-300">
            Localização
            <input
              type="text"
              value={profile.location}
              onChange={(e) => updateField('location', e.target.value)}
              className="mt-2 w-full rounded-3xl border border-white/10 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-accent"
            />
          </label>

          <label className="block text-sm text-zinc-300">
            Disponibilidade
            <input
              type="text"
              value={profile.availability}
              onChange={(e) => updateField('availability', e.target.value)}
              className="mt-2 w-full rounded-3xl border border-white/10 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-accent"
            />
          </label>

          <label className="block text-sm text-zinc-300">
            Email
            <input
              type="email"
              value={profile.email}
              onChange={(e) => updateField('email', e.target.value)}
              className="mt-2 w-full rounded-3xl border border-white/10 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-accent"
            />
          </label>

          <label className="block text-sm text-zinc-300">
            WhatsApp
            <input
              type="text"
              value={profile.whatsapp}
              onChange={(e) => updateField('whatsapp', e.target.value)}
              className="mt-2 w-full rounded-3xl border border-white/10 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-accent"
            />
          </label>

          <label className="block text-sm text-zinc-300">
            Currículo PDF
            <input
              type="url"
              value={profile.resumeUrl}
              onChange={(e) => updateField('resumeUrl', e.target.value)}
              placeholder="https://..."
              className="mt-2 w-full rounded-3xl border border-white/10 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-accent"
            />
          </label>

          <div className="grid gap-4">
            <label className="block text-sm text-zinc-300">
              GitHub
              <input
                type="url"
                value={profile.socialLinks.github}
                onChange={(e) => updateSocialField('github', e.target.value)}
                className="mt-2 w-full rounded-3xl border border-white/10 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-accent"
              />
            </label>
            <label className="block text-sm text-zinc-300">
              LinkedIn
              <input
                type="url"
                value={profile.socialLinks.linkedin}
                onChange={(e) => updateSocialField('linkedin', e.target.value)}
                className="mt-2 w-full rounded-3xl border border-white/10 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-accent"
              />
            </label>
            <label className="block text-sm text-zinc-300">
              Twitter
              <input
                type="url"
                value={profile.socialLinks.twitter}
                onChange={(e) => updateSocialField('twitter', e.target.value)}
                className="mt-2 w-full rounded-3xl border border-white/10 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-accent"
              />
            </label>
            <label className="block text-sm text-zinc-300">
              Website
              <input
                type="url"
                value={profile.socialLinks.website}
                onChange={(e) => updateSocialField('website', e.target.value)}
                className="mt-2 w-full rounded-3xl border border-white/10 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-accent"
              />
            </label>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="space-y-4 rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
          <h2 className="text-xl font-semibold text-white">Preview</h2>
          <div className="grid gap-4">
            <div className="rounded-3xl border border-white/10 bg-zinc-900 p-4">
              <p className="text-sm uppercase tracking-[0.3em] text-zinc-500 mb-3">Banner</p>
              {profile.banner ? (
                <img src={profile.banner} alt="Banner preview" className="h-44 w-full rounded-3xl object-cover" />
              ) : (
                <div className="flex h-44 items-center justify-center rounded-3xl border border-dashed border-zinc-700 text-sm text-zinc-500">
                  Sem banner definido
                </div>
              )}
            </div>
            <div className="rounded-3xl border border-white/10 bg-zinc-900 p-4">
              <p className="text-sm uppercase tracking-[0.3em] text-zinc-500 mb-3">Foto</p>
              {profile.photo ? (
                <img src={profile.photo} alt="Profile preview" className="h-44 w-full rounded-3xl object-cover" />
              ) : (
                <div className="flex h-44 items-center justify-center rounded-3xl border border-dashed border-zinc-700 text-sm text-zinc-500">
                  Sem foto definida
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-4 rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
          <h2 className="text-xl font-semibold text-white">Ações</h2>
          {error && <div className="rounded-3xl bg-red-500/10 p-4 text-sm text-red-200">{error}</div>}
          {success && <div className="rounded-3xl bg-emerald-500/10 p-4 text-sm text-emerald-200">{success}</div>}
          <button
            type="submit"
            disabled={saving || loading}
            className="w-full rounded-3xl bg-linear-to-r from-violet-600 to-cyan-500 px-5 py-3 text-sm font-semibold text-white transition hover:brightness-110 disabled:opacity-50"
          >
            {saving ? 'Salvando alterações...' : 'Salvar perfil'}
          </button>
          <p className="text-xs text-zinc-500">
            As atualizações do perfil são armazenadas no banco de dados e usadas nas páginas do portfólio.
          </p>
        </div>
      </div>
    </form>
  );
}
