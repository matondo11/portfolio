import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Photo from "@/lib/models/Photo";

export async function GET() {
  try {
    await dbConnect();
    const photos = await Photo.find({});
    return NextResponse.json(photos);
  } catch (error) {
    console.error("Failed to fetch photos:", error);
    return NextResponse.json({ error: "Failed to fetch photos." }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();
    const photo = new Photo(body);
    await photo.save();
    return NextResponse.json(photo, { status: 201 });
  } catch (error) {
    console.error("Failed to create photo:", error);
    return NextResponse.json({ error: "Failed to create photo." }, { status: 500 });
  }
}
