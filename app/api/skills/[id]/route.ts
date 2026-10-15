import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Skill from '@/models/Skill';

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await dbConnect();
    const data = await request.json();
    const skill = await Skill.findByIdAndUpdate(id, data, { new: true });
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
