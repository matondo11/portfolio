import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Profile from '@/models/Profile';
import { verifyToken } from '@/lib/auth';

function getTokenFromHeader(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader) return null;
  const parts = authHeader.split(' ');
  if (parts.length !== 2) return null;
  return parts[1];
}

export async function GET() {
  try {
    if (!process.env.MONGODB_URI) {
      return NextResponse.json({
        photo: '/foto.png',
        banner: '/banner.png',
        name: 'Nome do Desenvolvedor',
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
      });
    }

    await dbConnect();
    const profile = await Profile.findOne().sort({ updatedAt: -1 });
    if (!profile) {
      return NextResponse.json({
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
      });
    }

    return NextResponse.json(profile);
  } catch (error) {
    console.error('GET /api/profile error:', error);
    return NextResponse.json({ error: (error as any)?.message || 'Erro ao buscar perfil' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    if (!process.env.MONGODB_URI) {
      return NextResponse.json({ error: 'Database não configurado' }, { status: 500 });
    }

    const token = getTokenFromHeader(request);
    if (!token || !verifyToken(token)) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    await dbConnect();
    const payload = await request.json();

    const profile = await Profile.findOneAndUpdate({}, payload, {
      new: true,
      upsert: true,
      setDefaultsOnInsert: true,
    });

    return NextResponse.json(profile);
  } catch (error) {
    console.error('PUT /api/profile error:', error);
    return NextResponse.json({ error: (error as any)?.message || 'Erro ao atualizar perfil' }, { status: 500 });
  }
}
