import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import HeroConfig from '@/models/HeroConfig';
import { requireAuth } from '@/lib/auth';

export async function PUT(request: NextRequest) {
  try {
    if (!process.env.MONGODB_URI) return NextResponse.json({ error: 'DB não configurado' }, { status: 500 });
    const auth = requireAuth(request);
    if (!auth.ok) return NextResponse.json({ error: auth.error || 'Não autorizado' }, { status: 401 });

    await dbConnect();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const payload = await request.json();
    const updated = await HeroConfig.findByIdAndUpdate(id, payload, { new: true, upsert: true });
    return NextResponse.json(updated);
  } catch (error) {
    console.error('PUT /api/hero/[id] error:', error);
    return NextResponse.json({ error: (error as any)?.message || 'Erro ao atualizar' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    if (!process.env.MONGODB_URI) return NextResponse.json({ error: 'DB não configurado' }, { status: 500 });
    const auth = requireAuth(request);
    if (!auth.ok) return NextResponse.json({ error: auth.error || 'Não autorizado' }, { status: 401 });

    await dbConnect();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    await HeroConfig.findByIdAndDelete(id);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('DELETE /api/hero/[id] error:', error);
    return NextResponse.json({ error: (error as any)?.message || 'Erro ao deletar' }, { status: 500 });
  }
}
