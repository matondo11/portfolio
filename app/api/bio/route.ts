import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Bio from "@/lib/models/Bio";

export async function GET() {
  try {
    await dbConnect();
    const bio = await Bio.findOne({});
    return NextResponse.json(bio);
  } catch (error) {
    console.error("Failed to fetch bio:", error);
    return NextResponse.json({ error: "Failed to fetch bio." }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();
    const bio = new Bio(body);
    await bio.save();
    return NextResponse.json(bio, { status: 201 });
  } catch (error) {
    console.error("Failed to create bio:", error);
    return NextResponse.json({ error: "Failed to create bio." }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();
    const bio = await Bio.findOneAndUpdate({}, body, { new: true, upsert: true });
    return NextResponse.json(bio);
  } catch (error) {
    console.error("Failed to update bio:", error);
    return NextResponse.json({ error: "Failed to update bio." }, { status: 500 });
  }
}
