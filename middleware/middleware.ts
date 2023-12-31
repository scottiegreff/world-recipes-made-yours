import { NextResponse } from "next/server";

// List of allowed origins
const allowedOrigins = ['https://api.openai.com'];

export function middleware(request: Request) {
  const res = NextResponse.next();
  const origin = request.headers.get("Origin");
  if (origin && allowedOrigins.includes(origin)) {
    res.headers.append("Access-Control-Allow-Origin", origin);
  }
  res.headers.append("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST");
  res.headers.append("Access-Control-Allow-Headers", "Content-Type, Access-Key, Authorization");
  res.headers.append("Access-Control-Allow-Credentials", "true");
  if (request.method === "OPTIONS") {
    return new NextResponse(null, { status: 200 });
  }
  return res;
}
