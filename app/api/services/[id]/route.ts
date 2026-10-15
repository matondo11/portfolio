import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Service from '@/models/Service';

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await dbConnect();
    const data = await request.json();
    const service = await Service.findByIdAndUpdate(id, data, { new: true });
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
