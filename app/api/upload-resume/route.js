import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import {prisma} from "@/lib/prisma";
import jwt from "jsonwebtoken";

// --- Cloudinary Config ---
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ------------------------
// POST: Upload Resume PDF
// ------------------------
export async function POST(req) {
    try {
        // 1️⃣ Get token from Authorization header
        const authHeader = req.headers.get("authorization");
        if (!authHeader || !authHeader.startsWith("Bearer "))
            return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

        const token = authHeader.split(" ")[1];

        // 2️⃣ Verify JWT
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id; // adjust to your payload
        if (!userId) return NextResponse.json({ error: "User ID not found in token" }, { status: 401 });

        // 3️⃣ Find user's portfolio
        const userPortfolio = await prisma.userPortfolio.findUnique({ where: { id: userId } });
        if (!userPortfolio) return NextResponse.json({ error: "User portfolio not found" }, { status: 404 });

        // 4️⃣ Handle uploaded file
        const formData = await req.formData();
        const file = formData.get("file");
        if (!file) return NextResponse.json({ error: "No file uploaded" }, { status: 400 });

        const buffer = Buffer.from(await file.arrayBuffer());

        // 5️⃣ Upload PDF to Cloudinary
        const result = await new Promise((resolve, reject) => {
            cloudinary.uploader
                .upload_stream(
                    {
                        resource_type: "raw",
                        folder: "resumes",
                        format: "pdf",
                        upload_preset: "Portfolio",
                    },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result);
                    }
                )
                .end(buffer);
        });

        // 6️⃣ Save resume URL to user's portfolio
        const updatedPortfolio = await prisma.userPortfolio.update({
            where: { id: userId },
            data: { resumeUrl: result.secure_url },
        });

        return NextResponse.json({ success: true, data: updatedPortfolio });
    } catch (err) {
        console.error("Upload Error:", err);
        return NextResponse.json({ error: err.message || "Upload failed" }, { status: 500 });
    }
}

// ------------------------
// GET: Fetch Logged-in User Resume
// ------------------------
export async function GET(req) {
    try {
        // 1️⃣ Get token from Authorization header
        const authHeader = req.headers.get("authorization");
        if (!authHeader || !authHeader.startsWith("Bearer "))
            return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

        const token = authHeader.split(" ")[1];

        // 2️⃣ Verify JWT
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id; // adjust to your payload
        if (!userId) return NextResponse.json({ error: "User ID not found in token" }, { status: 401 });

        // 3️⃣ Fetch user's portfolio
        const userPortfolio = await prisma.userPortfolio.findUnique({ where: { id: userId } });
        if (!userPortfolio) return NextResponse.json({ error: "User portfolio not found" }, { status: 404 });

        // 4️⃣ Return resume URL
        return NextResponse.json({ resumeUrl: userPortfolio.resumeUrl || null });
    } catch (err) {
        console.error("Fetch Resume Error:", err);
        return NextResponse.json({ error: err.message || "Failed to fetch resume" }, { status: 500 });
    }
}
