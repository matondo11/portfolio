import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Skill from '@/models/Skill';
import { skills as fallbackSkills } from '@/data/skills';
import { requireAuth } from '@/lib/auth';

export async function GET() {
  try {
    if (!process.env.MONGODB_URI) {
      return NextResponse.json(fallbackSkills);
    }

    await dbConnect();
    const skills = await Skill.find().sort({ createdAt: -1 }).lean();
    return NextResponse.json(
      skills.map((skill: any) => ({
        ...skill,
        _id: skill._id?.toString(),
      }))
    );
  } catch (error) {
    console.error('GET /api/skills error:', error);
    return NextResponse.json({ error: (error as any)?.message || 'Erro ao buscar habilidades' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const auth = requireAuth(request);
    if (!auth.ok) {
      return NextResponse.json({ error: auth.error || 'Não autorizado' }, { status: 401 });
    }

    if (!process.env.MONGODB_URI) {
      return NextResponse.json({ error: 'Banco de dados não configurado' }, { status: 500 });
    }

    await dbConnect();
    const data = await request.json();
    if (!data.name?.trim() || !['mastered', 'learning', 'planned'].includes(data.level)) {
      return NextResponse.json({ error: 'Nome e categoria válida são obrigatórios' }, { status: 400 });
    }
    if (data.proficiency !== undefined && (!Number.isFinite(data.proficiency) || data.proficiency < 0 || data.proficiency > 100)) {
      return NextResponse.json({ error: 'Proficiência deve estar entre 0 e 100' }, { status: 400 });
    }
    const skill = new Skill(data);
    await skill.save();
    return NextResponse.json(skill, { status: 201 });
  } catch (error) {
    console.error('POST /api/skills error:', error);
    return NextResponse.json({ error: (error as any)?.message || 'Erro ao criar skill' }, { status: 500 });
  }
}
