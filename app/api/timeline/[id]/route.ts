import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import TimelineItem from '@/models/TimelineItem';
import { requireAuth } from '@/lib/auth';

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    if (!process.env.MONGODB_URI) return NextResponse.json({ error: 'DB não configurado' }, { status: 500 });

    const auth = requireAuth(request);
    if (!auth.ok) return NextResponse.json({ error: auth.error || 'Não autorizado' }, { status: 401 });

    await dbConnect();
    const { id } = await params;
    const payload = await request.json();
    if (payload.category && !['experience', 'education'].includes(payload.category)) {
      return NextResponse.json({ error: 'Categoria inválida' }, { status: 400 });
    }
    const updated = await TimelineItem.findByIdAndUpdate(id, payload, { new: true, runValidators: true });
    if (!updated) return NextResponse.json({ error: 'Registro não encontrado' }, { status: 404 });
    return NextResponse.json(updated);
  } catch (error) {
    console.error('PUT /api/timeline/[id] error:', error);
    return NextResponse.json({ error: (error as any)?.message || 'Erro ao atualizar' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    if (!process.env.MONGODB_URI) return NextResponse.json({ error: 'DB não configurado' }, { status: 500 });

    const auth = requireAuth(request);
    if (!auth.ok) return NextResponse.json({ error: auth.error || 'Não autorizado' }, { status: 401 });

    await dbConnect();
    const { id } = await params;
    const deleted = await TimelineItem.findByIdAndDelete(id);
    if (!deleted) return NextResponse.json({ error: 'Registro não encontrado' }, { status: 404 });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('DELETE /api/timeline/[id] error:', error);
    return NextResponse.json({ error: (error as any)?.message || 'Erro ao deletar' }, { status: 500 });
  }
}
