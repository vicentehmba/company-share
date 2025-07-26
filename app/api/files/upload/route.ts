// Validate required environment variables at runtime
function validateEnv() {
  const requiredVars = ["MONGODB_URI", "MAX_FILE_SIZE"];
  const missing = requiredVars.filter((v) => !process.env[v]);
  if (missing.length > 0) {
    console.error("Missing environment variables:", missing.join(", "));
    return false;
  }
  return true;
}
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import connectDB from "@/lib/mongodb";
import File from "@/lib/models/File";
import User from "@/lib/models/User";
import { authOptions } from "@/lib/auth";
import { isValidFileType } from "@/lib/utils";

export async function POST(request: NextRequest) {
  if (!validateEnv()) {
    return NextResponse.json(
      { error: "Server misconfiguration" },
      { status: 500 }
    );
  }
  try {
    await connectDB();
    
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Validate file type
    if (!isValidFileType(file)) {
      return NextResponse.json({ error: "Invalid file type" }, { status: 400 });
    }

    // Check file size (from env, fallback 10MB)
    const maxSize = parseInt(process.env.MAX_FILE_SIZE || "10485760");
    if (isNaN(maxSize) || maxSize <= 0) {
      console.error("MAX_FILE_SIZE is not a valid number");
      return NextResponse.json(
        { error: "Server misconfiguration" },
        { status: 500 }
      );
    }
    if (file.size > maxSize) {
      return NextResponse.json({ error: "File too large" }, { status: 400 });
    }

    // Create upload directory if it doesn't exist
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    try {
      await mkdir(uploadDir, { recursive: true });
    } catch {
      // Directory might already exist
    }

    // Generate unique filename
    const timestamp = Date.now();
    const extension = path.extname(file.name);
    const filename = `${timestamp}-${Math.random()
      .toString(36)
      .substring(2)}${extension}`;
    const filepath = path.join(uploadDir, filename);

    // Save file
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(filepath, buffer);

    // Save file info to database
    const fileRecord = await File.create({
      name: filename,
      originalName: file.name,
      url: `/uploads/${filename}`,
      mimeType: file.type,
      size: file.size,
      department: session.user.department,
      ownerId: session.user.id,
    });

    // Get owner details for response
    const owner = await User.findById(session.user.id).select('fullName uniqueId');

    const fileResponse = {
      id: fileRecord._id,
      name: fileRecord.name,
      originalName: fileRecord.originalName,
      url: fileRecord.url,
      mimeType: fileRecord.mimeType,
      size: fileRecord.size,
      department: fileRecord.department,
      createdAt: fileRecord.createdAt,
      updatedAt: fileRecord.updatedAt,
      owner: {
        fullName: owner?.fullName,
        uniqueId: owner?.uniqueId,
      },
    };

    return NextResponse.json({
      message: "File uploaded successfully",
      file: fileResponse,
    });
  } catch (error) {
    console.error("File upload error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
