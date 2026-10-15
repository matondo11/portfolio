import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Service from '@/models/Service';
import { requireAuth } from '@/lib/auth';

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const auth = requireAuth(request);
    if (!auth.ok) {
      return NextResponse.json({ error: auth.error || 'Não autorizado' }, { status: 401 });
    }

    const { id } = await params;
    await dbConnect();
    const data = await request.json();
    if (data.title !== undefined && !data.title.trim() || data.description !== undefined && !data.description.trim() || data.icon !== undefined && !data.icon.trim()) {
      return NextResponse.json({ error: 'Título, descrição e ícone não podem ficar vazios' }, { status: 400 });
    }
    const service = await Service.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    if (!service) {
      return NextResponse.json({ error: 'Service não encontrado' }, { status: 404 });
    }
    return NextResponse.json(service);
  } catch (error) {
    console.error('PUT /api/services/[id] error:', error);
    return NextResponse.json({ error: (error as any)?.message || 'Erro ao atualizar service' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const auth = requireAuth(request);
    if (!auth.ok) {
      return NextResponse.json({ error: auth.error || 'Não autorizado' }, { status: 401 });
    }

    const { id } = await params;
    await dbConnect();
    const service = await Service.findByIdAndDelete(id);
    if (!service) {
      return NextResponse.json({ error: 'Service não encontrado' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Service deletado' });
  } catch (error) {
    console.error('DELETE /api/services/[id] error:', error);
    return NextResponse.json({ error: (error as any)?.message || 'Erro ao deletar service' }, { status: 500 });
  }
}
