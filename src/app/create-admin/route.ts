// app/create-admin/route.ts
import clientPromise from "@/lib/mongobd";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
// import User from "@/app/models/User"

export async function GET() {
  const client = await clientPromise;
  const users = client.db(process.env.MONGODB_DB_NAME).collection("users");

  const password = bcrypt.hashSync("password", 10);
  await users.insertOne({
    email: "admin@example.com",
    password: password,
    role: "admin",
  });

  return NextResponse.json({ success: true });
}
