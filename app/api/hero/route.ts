import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import HeroConfig from '@/models/HeroConfig';

export async function GET() {
  try {
    if (!process.env.MONGODB_URI) {
      return NextResponse.json({
        headline: 'Olá, eu sou [Seu Nome]',
        subheadline: 'Desenvolvedor Full Stack — criando experiências web',
        ctaText: 'Ver projetos',
        ctaUrl: '#projects',
        backgroundImage: '/banner.png',
        image: '/foto.png',
        enabled: true,
      });
    }

    await dbConnect();
    const cfg = await HeroConfig.findOne().sort({ updatedAt: -1 }).lean();
    if (!cfg) return NextResponse.json({});
    return NextResponse.json({ ...cfg, _id: cfg._id?.toString() });
  } catch (error) {
    console.error('GET /api/hero error:', error);
    return NextResponse.json({});
  }
}

export async function POST(request: NextRequest) {
  try {
    if (!process.env.MONGODB_URI) return NextResponse.json({ error: 'DB não configurado' }, { status: 500 });
    await dbConnect();
    const data = await request.json();
    const cfg = new HeroConfig(data);
    await cfg.save();
    return NextResponse.json(cfg, { status: 201 });
  } catch (error) {
    console.error('POST /api/hero error:', error);
    return NextResponse.json({ error: (error as any)?.message || 'Erro ao criar hero config' }, { status: 500 });
  }
}
