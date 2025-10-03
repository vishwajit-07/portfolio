import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    const admin = await prisma.UserPortfolio.findUnique({ where: { email } });
    if (!admin) {
      return new Response(
        JSON.stringify({ error: "Invalid email or password" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    const valid = await bcrypt.compare(password, admin.password);
    if (!valid) {
      return new Response(
        JSON.stringify({ error: "Invalid email or password" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not set in environment");
    }

    const token = await new SignJWT({
      id: admin.id,
      email: admin.email,
      role: admin.role,
      username: admin.name
    })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("1d")
      .sign(new TextEncoder().encode(process.env.JWT_SECRET));

    // 🔹 Log the token and admin info
    console.log("JWT Token:", token);
    console.log("Admin info:", {
      id: admin.id,
      email: admin.email,
      role: admin.role,
      username: admin.name
    });

    return new Response(
      JSON.stringify({
        token,
        admin: {
          id: admin.id,
          email: admin.email,
          role: admin.role,
          username: admin.name
        }
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Login error:", err);
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
