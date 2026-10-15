import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import TimelineItem from '@/models/TimelineItem';

export async function GET() {
  try {
    if (!process.env.MONGODB_URI) {
      return NextResponse.json([]);
    }

    await dbConnect();
    const items = await TimelineItem.find().sort({ order: 1, createdAt: -1 }).lean();
    return NextResponse.json(items.map((i: any) => ({ ...i, _id: i._id?.toString() })));
  } catch (error) {
    console.error('GET /api/timeline error:', error);
    return NextResponse.json([]);
  }
}

export async function POST(request: NextRequest) {
  try {
    if (!process.env.MONGODB_URI) {
      return NextResponse.json({ error: 'Banco de dados não configurado' }, { status: 500 });
    }

    await dbConnect();
    const data = await request.json();
    const item = new TimelineItem(data);
    await item.save();
    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    console.error('POST /api/timeline error:', error);
    return NextResponse.json({ error: (error as any)?.message || 'Erro ao criar timeline item' }, { status: 500 });
  }
}
