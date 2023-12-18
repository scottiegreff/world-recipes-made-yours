// import Cors from "cors"
// import { NextRequest, NextResponse } from 'next/server';
// import fetch from 'node-fetch';

// // Initialize the CORS middleware
// const cors = Cors({
//   methods: ['GET', 'HEAD', 'OPTIONS', 'POST'], // Define allowed methods
//   origin: '*', // Adjust this to restrict the origin
//   allowedHeaders: ['Content-Type', 'Authorization'],
//   // Add other configurations as needed
// });

// // Helper method to wait for a middleware to execute before continuing
// // And to throw an error when an error happens in a middleware
// function runMiddleware(req: NextRequest, res: NextResponse, fn: any) {
//   return new Promise((resolve, reject) => {
//     fn(req, res, (result: any) => {
//       if (result instanceof Error) {
//         return reject(result);
//       }
//       return resolve(result);
//     });
//   });
// }

// // The middleware function
// export async function middleware(req: NextRequest) {
//   const res = NextResponse.next();
//   // Run the middleware
//   await runMiddleware(req, res, cors);
//   // Continue processing the request
//   return res;
// }
