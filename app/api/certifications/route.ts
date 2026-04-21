import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Certification from "@/lib/models/Certification";

export async function GET() {
  try {
    await dbConnect();
    const certifications = await Certification.find({});
    return NextResponse.json(certifications);
  } catch (error) {
    console.error("Failed to fetch certifications:", error);
    return NextResponse.json(
      { error: "Failed to fetch certifications." },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();
    const certification = new Certification(body);
    await certification.save();
    return NextResponse.json(certification, { status: 201 });
  } catch (error) {
    console.error("Failed to create certification:", error);
    return NextResponse.json(
      { error: "Failed to create certification." },
      { status: 500 }
    );
  }
}
