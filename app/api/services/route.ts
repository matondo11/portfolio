import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Service from '@/models/Service';
import { services as fallbackServices } from '@/data/services';

export async function GET() {
  try {
    if (!process.env.MONGODB_URI) {
      return NextResponse.json(fallbackServices);
    }

    await dbConnect();
    const services = await Service.find().sort({ createdAt: -1 }).lean();
    return NextResponse.json(
      services.map((service: any) => ({
        ...service,
        _id: service._id?.toString(),
      }))
    );
  } catch (error) {
    console.error('GET /api/services error:', error);
    return NextResponse.json(fallbackServices);
  }
}

export async function POST(request: NextRequest) {
  try {
    if (!process.env.MONGODB_URI) {
      return NextResponse.json({ error: 'Banco de dados não configurado' }, { status: 500 });
    }

    await dbConnect();
    const data = await request.json();
    const service = new Service(data);
    await service.save();
    return NextResponse.json(service, { status: 201 });
  } catch (error) {
    console.error('POST /api/services error:', error);
    return NextResponse.json({ error: (error as any)?.message || 'Erro ao criar service' }, { status: 500 });
  }
}
