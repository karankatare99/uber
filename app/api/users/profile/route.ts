import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import z from "zod";

const Schema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string()
})

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parseResult = Schema.safeParse(body);
    if (!parseResult.success) return NextResponse.json({ message: "Invalid Body", issues: parseResult.error.issues }, { status: 400 });

    const { firstName, lastName, email } = parseResult.data;

    const existing = await prisma.user.update({ where: { email }, data: { firstName, lastName } });
    if (existing) {
      return NextResponse.json(
        { message: "Email already registered" },
        { status: 409 }
      );
    }

    return NextResponse.json({ message: "Updated user details" })
  } catch (e) {
      console.error('register API error:', e);
      return NextResponse.json({ message: "Failed to create user" });
  }
}

export async function PATCH(request: Request) {
  return new Response(null, { status: 204 });
}
