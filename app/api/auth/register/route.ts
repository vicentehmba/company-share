import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { ZodError } from "zod";
import { prisma } from "@/lib/prisma";
import { registerSchema } from "@/lib/schemas";
import { generateUniqueId } from "@/lib/utils";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = registerSchema.parse(body);

    // Check if email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 400 }
      );
    }

    // Generate unique ID
    let uniqueId = generateUniqueId(validatedData.department);

    // Ensure uniqueId is actually unique
    let existingIdUser = await prisma.user.findUnique({
      where: { uniqueId },
    });

    while (existingIdUser) {
      uniqueId = generateUniqueId(validatedData.department);
      existingIdUser = await prisma.user.findUnique({
        where: { uniqueId },
      });
    }

    // Hash password
    const passwordHash = await bcrypt.hash(validatedData.password, 12);

    // Create user
    const user = await prisma.user.create({
      data: {
        fullName: validatedData.fullName,
        email: validatedData.email,
        department: validatedData.department,
        uniqueId,
        passwordHash,
      },
      select: {
        id: true,
        fullName: true,
        email: true,
        department: true,
        uniqueId: true,
        createdAt: true,
      },
    });

    return NextResponse.json({
      message: "User created successfully",
      user,
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
