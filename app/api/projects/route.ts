import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Project from '@/models/Project';
import { projects as projectsData } from '@/data/projects';

export async function GET() {
  try {
    if (!process.env.MONGODB_URI) {
      // Development fallback: return static project data when no DB configured
      return NextResponse.json(projectsData);
    }

    await dbConnect();
    const projects = await Project.find().sort({ createdAt: -1 });
    return NextResponse.json(projects);
  } catch (error) {
    console.error('GET /api/projects error:', error);
    return NextResponse.json({ error: (error as any)?.message || 'Erro ao buscar projetos' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const data = await request.json();
    const project = new Project(data);
    await project.save();
    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error('POST /api/projects error:', error);
    // If mongoose validation error, return details
    const message = (error as any)?.message || 'Erro ao criar projeto';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}