import { v2 as cloudinary } from "cloudinary";
import prisma from "@/lib/prisma";
import formidable from "formidable";
import fs from "fs";

// Disable Next.js body parsing so formidable can handle it
export const config = { api: { bodyParser: false } };

// ---------------------
// Cloudinary config
// ---------------------
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ---------------------
// API Route Handler
// ---------------------
export default async function handler(req, res) {
  const { method } = req;
  const { id } = req.query;

  try {
    if (method === "GET") {
      // Fetch all projects
      const projects = await prisma.project.findMany({
        orderBy: { createdAt: "desc" },
      });
      return res.status(200).json(projects);
    }

    if (method === "POST") {
      // Parse form-data for file upload
      const form = new formidable.IncomingForm();
      form.parse(req, async (err, fields, files) => {
        if (err) return res.status(500).json({ error: err.message });

        let imageUrl = fields.imageUrl || "";
        if (files.image) {
          const filePath = files.image.filepath || files.image.filepath;
          const result = await cloudinary.uploader.upload(filePath, {
            folder: "projects",
          });
          imageUrl = result.secure_url;

          // Clean up temp file
          fs.unlinkSync(filePath);
        }

        // Create project in DB
        const project = await prisma.project.create({
          data: {
            title: fields.title,
            description: fields.description || "",
            codeLink: fields.codeLink || "",
            liveLink: fields.liveLink || "",
            imageUrl,
            languages: fields.languages.split(",").map((s) => s.trim()),
            software: fields.software ? fields.software.split(",").map((s) => s.trim()) : [],
          },
        });

        return res.status(201).json(project);
      });
    }

    if (method === "PUT") {
      if (!id) return res.status(400).json({ error: "Project ID is required" });

      const data = req.body;
      const updated = await prisma.project.update({
        where: { id },
        data: {
          title: data.title,
          description: data.description || "",
          codeLink: data.codeLink || "",
          liveLink: data.liveLink || "",
          imageUrl: data.imageUrl || "",
          languages: data.languages,
          software: data.software || [],
        },
      });

      return res.status(200).json(updated);
    }

    if (method === "DELETE") {
      if (!id) return res.status(400).json({ error: "Project ID is required" });

      await prisma.project.delete({ where: { id } });
      return res.status(200).json({ success: true });
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
}
