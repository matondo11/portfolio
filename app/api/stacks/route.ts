import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Stack from '@/models/Stack';

export async function GET() {
  try {
    if (!process.env.MONGODB_URI) return NextResponse.json([]);
    await dbConnect();
    const stacks = await Stack.find().sort({ order: 1, createdAt: -1 }).lean();
    return NextResponse.json(stacks.map((s: any) => ({ ...s, _id: s._id?.toString() })));
  } catch (error) {
    console.error('GET /api/stacks error:', error);
    return NextResponse.json([]);
  }
}

export async function POST(request: NextRequest) {
  try {
    if (!process.env.MONGODB_URI) return NextResponse.json({ error: 'DB não configurado' }, { status: 500 });
    await dbConnect();
    const data = await request.json();
    const stack = new Stack(data);
    await stack.save();
    return NextResponse.json(stack, { status: 201 });
  } catch (error) {
    console.error('POST /api/stacks error:', error);
    return NextResponse.json({ error: (error as any)?.message || 'Erro ao criar stack' }, { status: 500 });
  }
}
