import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Project from '@/models/Project';
import { projects as projectsData } from '@/data/projects';
import { normalizeProjectInput, resolveProjectList } from '@/lib/project-content';
import { requireAuth } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const includeDrafts = request.nextUrl.searchParams.get('includeDrafts') === 'true';

    if (includeDrafts) {
      const auth = requireAuth(request);
      if (!auth.ok) {
        return NextResponse.json({ error: auth.error || 'Não autorizado' }, { status: 401 });
      }
    }

    if (!process.env.MONGODB_URI) {
      return NextResponse.json(resolveProjectList(projectsData, includeDrafts));
    }

    await dbConnect();
    const filter = includeDrafts ? {} : { published: { $ne: false } };
    const projects = await Project.find(filter).sort({ createdAt: -1 });
    return NextResponse.json(projects);
  } catch (error) {
    console.error('GET /api/projects error:', error);
    return NextResponse.json({ error: (error as any)?.message || 'Erro ao buscar projetos' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const auth = requireAuth(request);
    if (!auth.ok) {
      return NextResponse.json({ error: auth.error || 'Não autorizado' }, { status: 401 });
    }

    await dbConnect();
    const data = await request.json();
    const normalized = normalizeProjectInput(data);
    const project = new Project(normalized);
    await project.save();
    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error('POST /api/projects error:', error);
    const message = (error as any)?.message || 'Erro ao criar projeto';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}