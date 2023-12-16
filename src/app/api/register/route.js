import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request) {
  const body = await request.json();
  const { name, email, password, confirmPassword } = body.data;
  if (!name || !email || !password || !confirmPassword) {
    return new NextResponse("Missing name, email or passwords", { status: 400 });
  }
  if (password !== confirmPassword) {
    return new NextResponse("Passwords do not match", { status: 400 });
  }

  const exist = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (exist) {
    return new NextResponse("User already exists!!!!", { status: 400 });
  }
  const hashedPassword = bcrypt.hashSync(password, 10);

  const user = await prisma.user.create({
    data: {
      name: name,
      email: email,
      password: hashedPassword,
      recipes: [],
    },
  });

  return NextResponse.json(user, { status: 200 });
}
