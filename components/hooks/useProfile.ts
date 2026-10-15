'use client';

import { useEffect, useState } from 'react';
import { Profile } from '@/types';

const defaultProfile: Profile = {
  photo: '/foto.jpg',
  banner: '/banner.jpg',
  name: 'Full Stack Developer',
  role: 'Full Stack Developer',
  summary: 'Crie experiências digitais incríveis usando React e Next.js.',
  about: 'Sou um desenvolvedor apaixonado por soluções escaláveis e interfaces elegantes.',
  location: 'Luanda, Angola',
  availability: 'Disponível para novos projetos',
  email: 'contato@portfolio.com',
  whatsapp: '+244 900 000 000',
  resumeUrl: '/resume.pdf',
  socialLinks: {
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com',
    website: 'https://portfolio.com',
  },
};

export function useProfile() {
  const [profile, setProfile] = useState<Profile>(defaultProfile);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function fetchProfile() {
      try {
        const res = await fetch('/api/profile');
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data?.error || 'Falha ao carregar perfil');
        }
        if (mounted) {
          setProfile({ ...defaultProfile, ...data });
        }
      } catch (err) {
        if (mounted) {
          setError((err as Error)?.message || 'Erro desconhecido');
          setProfile(defaultProfile);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    fetchProfile();
    return () => {
      mounted = false;
    };
  }, []);

  return { profile, loading, error };
}
