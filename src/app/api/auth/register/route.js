import { prisma } from "@/utils/prisma";
import bcrypt from "bcrypt"; // 🔥 switch to bcrypt!
import { NextResponse } from "next/server";

export async function POST(request) {
  const body = await request.json();
  const { name, email, password } = body;

  if (!name?.trim() || !email?.trim() || !password?.trim()) {
    return NextResponse.json({ message: "Fields are empty" }, { status: 400 });
  }

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return NextResponse.json(
      { message: "User already exists" },
      { status: 400 }
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10); // 🔥 hash securely

  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        hashedPassword, // ✅ CORRECT FIELD
      },
    });
    console.log("User created:", user);
    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
