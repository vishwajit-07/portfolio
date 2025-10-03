import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"

// GET: fetch the first admin
export async function GET() {
  try {
    const admin = await prisma.userPortfolio.findFirst()
    if (!admin) {
      return NextResponse.json({ error: "No admin found" }, { status: 404 })
    }

    // Exclude password
    const { id, email, name, role } = admin
    return NextResponse.json({ id, email, name, role })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

// PUT: update admin
export async function PUT(req) {
  try {
    const { email, password, name } = await req.json()

    if (!email && !password && !name) {
      return NextResponse.json({ error: "Nothing to update" }, { status: 400 })
    }

    const admin = await prisma.userPortfolio.findFirst()
    if (!admin) {
      return NextResponse.json({ error: "No admin found" }, { status: 404 })
    }

    const updateData = {}
    if (email) updateData.email = email
    if (name) updateData.name = name
    if (password) updateData.password = await bcrypt.hash(password, 10)

    const updatedAdmin = await prisma.userPortfolio.update({
      where: { id: admin.id },
      data: updateData
    })

    // Return updated admin (without password)
    const { id, email: updatedEmail, name: updatedName, role } = updatedAdmin
    return NextResponse.json({
      message: "Admin updated successfully",
      admin: { id, email: updatedEmail, name: updatedName, role }
    })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
