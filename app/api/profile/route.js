import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET Profile
export async function GET() {
  const profile = await prisma.profile.findFirst();
  return NextResponse.json(profile);
}

// POST (Upsert Profile)
export async function POST(req) {
  const data = await req.json();
  const profile = await prisma.profile.upsert({
    where: { id: data.id || "" },
    update: {
      name: data.name,
      role: data.role,
      bio: data.bio,
      address: data.address,
      email: data.email,
      phone: data.phone,
    },
    create: {
      name: data.name,
      role: data.role,
      bio: data.bio,
      address: data.address,
      email: data.email,
      phone: data.phone,
    },
  });
  return NextResponse.json(profile);
}
