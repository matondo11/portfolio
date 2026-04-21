import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Skill from "@/lib/models/Skill";

export async function GET() {
  try {
    await dbConnect();
    const skills = await Skill.find({});
    return NextResponse.json(skills);
  } catch (error) {
    console.error("Failed to fetch skills:", error);
    return NextResponse.json({ error: "Failed to fetch skills." }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();
    const skill = new Skill(body);
    await skill.save();
    return NextResponse.json(skill, { status: 201 });
  } catch (error) {
    console.error("Failed to create skill:", error);
    return NextResponse.json({ error: "Failed to create skill." }, { status: 500 });
  }
}
