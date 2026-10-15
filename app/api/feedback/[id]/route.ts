import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Feedback from '@/models/Feedback';
import { requireAuth } from '@/lib/auth';

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const auth = requireAuth(request);
    if (!auth.ok) {
      return NextResponse.json({ error: auth.error || 'Não autorizado' }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();

    if (typeof body.approved !== 'boolean') {
      return NextResponse.json({ error: 'approved deve ser true ou false' }, { status: 400 });
    }

    await dbConnect();
    const entry = await Feedback.findByIdAndUpdate(id, { approved: body.approved }, { new: true });
    if (!entry) {
      return NextResponse.json({ error: 'Depoimento não encontrado' }, { status: 404 });
    }
    return NextResponse.json({
      id: entry._id.toString(),
      name: entry.name,
      rating: entry.rating,
      comment: entry.comment,
      role: entry.role,
      approved: entry.approved,
      createdAt: entry.createdAt.toISOString(),
    });
  } catch (error) {
    console.error('PUT /api/feedback/[id] error:', error);
    return NextResponse.json({ error: (error as any)?.message || 'Erro ao atualizar depoimento' }, { status: 500 });
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
    const entry = await Feedback.findByIdAndDelete(id);
    if (!entry) {
      return NextResponse.json({ error: 'Depoimento não encontrado' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Depoimento deletado' });
  } catch (error) {
    console.error('DELETE /api/feedback/[id] error:', error);
    return NextResponse.json({ error: (error as any)?.message || 'Erro ao deletar depoimento' }, { status: 500 });
  }
}
