import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Skill from '@/models/Skill';
import { skills as fallbackSkills } from '@/data/skills';

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
    return NextResponse.json(fallbackSkills);
  }
}

export async function POST(request: NextRequest) {
  try {
    if (!process.env.MONGODB_URI) {
      return NextResponse.json({ error: 'Banco de dados não configurado' }, { status: 500 });
    }

    await dbConnect();
    const data = await request.json();
    const skill = new Skill(data);
    await skill.save();
    return NextResponse.json(skill, { status: 201 });
  } catch (error) {
    console.error('POST /api/skills error:', error);
    return NextResponse.json({ error: (error as any)?.message || 'Erro ao criar skill' }, { status: 500 });
  }
}
