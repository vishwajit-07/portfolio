import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET all skills
export async function GET() {
  const skills = await prisma.skill.findMany();
  return NextResponse.json(skills);
}

// POST (create skill)
export async function POST(req) {
  const data = await req.json();
  const skill = await prisma.skill.create({
    data: {
      title: data.title,
      desc: data.desc,
      icon: data.icon,
    },
  });
  return NextResponse.json(skill);
}
