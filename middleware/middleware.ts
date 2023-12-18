import { NextResponse } from "next/server";
export { default } from "next-auth/middleware";

export function middleware(request: Request) {
  // const origin = request.headers.get(process.env.MONGODB_URI as string);
  // console.log("origin: ", origin);

  // const response = NextResponse.next();
  // // response.headers.set("Access-Control-Allow-Origin", "*");
  // // response.headers.set(
  // //   "Access-Control-Allow-Methods",
  // //   "GET, HEAD, POST, PUT, OPTIONS"
  // // );
  // response.headers.set("Access-Control-Allow-Headers", "Content-Type");
  // response.headers.set("Access-Control-Max-Age", "86400");

  // console.log("MIDDLEWARE: ");
  // console.log(request.method);
  // console.log(request.url);
}
export const config = {
  matcher: ["/users", "/create-admin", "/api/:path*"],
};
