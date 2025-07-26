import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { ZodError } from "zod";
import connectDB from "@/lib/mongodb";
import User from "@/lib/models/User";
import { registerSchema } from "@/lib/schemas";
import { generateUniqueId } from "@/lib/utils";

export async function POST(request: Request) {
  try {
    if (!process.env.MONGODB_URI) {
      console.error("MONGODB_URI is not set");
      return NextResponse.json(
        { error: "Server misconfiguration" },
        { status: 500 }
      );
    }

    await connectDB();
    
    const body = await request.json();
    const validatedData = registerSchema.parse(body);

    // Check if email already exists
    const existingUser = await User.findOne({ email: validatedData.email });

    if (existingUser) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 400 }
      );
    }

    // Generate unique ID
    let uniqueId = generateUniqueId(validatedData.department);

    // Ensure uniqueId is actually unique
    let existingIdUser = await User.findOne({ uniqueId });

    while (existingIdUser) {
      uniqueId = generateUniqueId(validatedData.department);
      existingIdUser = await User.findOne({ uniqueId });
    }

    // Hash password
    const passwordHash = await bcrypt.hash(validatedData.password, 12);

    // Create user
    const user = await User.create({
      fullName: validatedData.fullName,
      email: validatedData.email,
      department: validatedData.department,
      uniqueId,
      passwordHash,
    });

    const userResponse = {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      department: user.department,
      uniqueId: user.uniqueId,
      createdAt: user.createdAt,
    };

    return NextResponse.json({
      message: "User created successfully",
      user: userResponse,
      uniqueId,
    });
  } catch (error: unknown) {
    console.error("Registration error:", error);

    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.issues },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
