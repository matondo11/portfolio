import { NextRequest, NextResponse } from "next/server";
import { addContactMessage } from "@/lib/db";
import { ContactInput } from "@/types";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as ContactInput;
    const name = body.name?.trim();
    const email = body.email?.trim().toLowerCase();
    const message = body.message?.trim();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "name, email, and message are required" },
        { status: 400 }
      );
    }

    if (name.length < 2 || message.length < 10 || message.length > 2000) {
      return NextResponse.json(
        { error: "Please provide a more complete message." },
        { status: 400 }
      );
    }

    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    const entry = await addContactMessage({ name, email, message });
    return NextResponse.json({ message: entry }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
}
