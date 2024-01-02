import { NextResponse } from "next/server";

// List of allowed origins
const allowedOrigins = ['https://api.openai.com', 'https://world-recipes-made-yours.vercel.app/api/chat', 'https://world-recipes-made-yours.vercel.app',
 'https://www.worldrecipesmade.com/', 'https://worldrecipesmade.com/, http://localhost:3000'];

export function middleware(request: Request) {

  console.log("HEELLOOO FROM MIDDLEWARE!!!!!!!!!!!!!!!!!")
  console.log("Request Method: ", request.method)
  console.log("Request URL: ", request.url)
  console.log("Request Headers: ", request.headers)
  console.log( "Request Origin",request.headers.get("Origin"));

  const res = NextResponse.next();
  const origin = request.headers.get("Origin");
  if (origin && allowedOrigins.includes(origin)) {
    res.headers.append("Access-Control-Allow-Origin", origin);
  }
  res.headers.append("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST");
  res.headers.append("Access-Control-Allow-Headers", "Content-Type, Access-Key, Authorization, Origin, X-Requested-With, Accept");
  res.headers.append("Access-Control-Allow-Credentials", "true");
  if (request.method === "OPTIONS") {
    return new NextResponse(null, { status: 200 });
  }
  return res;
}

// export const config = {
//   matcher: "/api/chat/:path*",
// };
