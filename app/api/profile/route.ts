import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Profile from '@/models/Profile';
import { requireAuth } from '@/lib/auth';

export async function GET() {
  try {
    if (!process.env.MONGODB_URI) {
      return NextResponse.json({
        photo: '', banner: '', name: '', role: '', summary: '', about: '',
        location: '', availability: '', email: '', whatsapp: '', resumeUrl: '',
        socialLinks: { github: '', linkedin: '', twitter: '', website: '' },
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

    const auth = requireAuth(request);
    if (!auth.ok) {
      return NextResponse.json({ error: auth.error || 'Não autorizado' }, { status: 401 });
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
