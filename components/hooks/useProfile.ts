'use client';

import { useEffect, useState } from 'react';
import { Profile } from '@/types';

const defaultProfile: Profile = {
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
