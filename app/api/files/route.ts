import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import connectDB from "@/lib/mongodb";
import File from "@/lib/models/File";
import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    await connectDB();
    
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const files = await File.find({
      department: session.user.department,
    })
    .populate('ownerId', 'fullName uniqueId')
    .sort({ createdAt: -1 });

    const formattedFiles = files.map(file => {
      const owner = file.ownerId as { fullName: string; uniqueId: string };
      return {
        id: file._id,
        name: file.name,
        originalName: file.originalName,
        url: file.url,
        mimeType: file.mimeType,
        size: file.size,
        department: file.department,
        createdAt: file.createdAt,
        updatedAt: file.updatedAt,
        owner: {
          fullName: owner.fullName,
          uniqueId: owner.uniqueId,
        },
      };
    });

    return NextResponse.json({ files: formattedFiles });
  } catch (error) {
    console.error("Get files error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
