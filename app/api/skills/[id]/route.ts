import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Skill from '@/models/Skill';
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
    if (data.level && !['mastered', 'learning', 'planned'].includes(data.level)) {
      return NextResponse.json({ error: 'Categoria inválida' }, { status: 400 });
    }
    if (data.proficiency !== undefined && (!Number.isFinite(data.proficiency) || data.proficiency < 0 || data.proficiency > 100)) {
      return NextResponse.json({ error: 'Proficiência deve estar entre 0 e 100' }, { status: 400 });
    }
    const skill = await Skill.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    if (!skill) {
      return NextResponse.json({ error: 'Skill não encontrada' }, { status: 404 });
    }
    return NextResponse.json(skill);
  } catch (error) {
    console.error('PUT /api/skills/[id] error:', error);
    return NextResponse.json({ error: (error as any)?.message || 'Erro ao atualizar skill' }, { status: 500 });
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
    const skill = await Skill.findByIdAndDelete(id);
    if (!skill) {
      return NextResponse.json({ error: 'Skill não encontrada' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Skill deletada' });
  } catch (error) {
    console.error('DELETE /api/skills/[id] error:', error);
    return NextResponse.json({ error: (error as any)?.message || 'Erro ao deletar skill' }, { status: 500 });
  }
}
