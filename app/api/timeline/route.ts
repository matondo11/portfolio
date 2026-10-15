import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import TimelineItem from '@/models/TimelineItem';
import { requireAuth } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    if (!process.env.MONGODB_URI) {
      return NextResponse.json([]);
    }

    await dbConnect();
    const category = request.nextUrl.searchParams.get('category');
    const filter = category === 'education'
      ? { category: 'education' }
      : category === 'experience'
        ? { $or: [{ category: 'experience' }, { category: { $exists: false } }] }
        : {};
    const items = await TimelineItem.find(filter).sort({ order: 1, createdAt: -1 }).lean();
    return NextResponse.json(items.map((i: any) => ({ ...i, category: i.category || 'experience', _id: i._id?.toString() })));
  } catch (error) {
    console.error('GET /api/timeline error:', error);
    return NextResponse.json([]);
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
    if (!['experience', 'education'].includes(data.category) || !data.title?.trim()) {
      return NextResponse.json({ error: 'Categoria e título são obrigatórios' }, { status: 400 });
    }
    const item = new TimelineItem(data);
    await item.save();
    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    console.error('POST /api/timeline error:', error);
    return NextResponse.json({ error: (error as any)?.message || 'Erro ao criar timeline item' }, { status: 500 });
  }
}
