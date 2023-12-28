import { NextRequest, NextResponse } from 'next/server';
// List of allowed origins
const allowedOrigins = ['http://localhost:3000', 'https://www.worldrecipesmade.com'];

export function middleware(req: NextRequest) {
    const res = NextResponse.next();

        // Get the origin of the request
        const origin = req.headers.get('Origin');
        console.log("ORIGIN!!!!!!!!!!: ", origin)

    // If the origin is in the list of allowed origins, set the Access-Control-Allow-Origin header
    if (origin && allowedOrigins.includes(origin)) {
        res.headers.append('Access-Control-Allow-Origin', origin);
    }
    res.headers.append(
        "Access-Control-Allow-Methods",
        "GET,OPTIONS,PATCH,DELETE,POST"
    );
    res.headers.append(
        "Access-Control-Allow-Headers",
        "Content-Type, Access-Key, Authorization"
    );
    res.headers.append("Access-Control-Allow-Credentials", "true");
    if (req.method === "OPTIONS") {
        return new NextResponse(null, { status: 200 });
    }

    return res;
}


// // app/api/chat/_middleware.ts
// import { NextRequest, NextResponse } from 'next/server';

// export function middleware(req: NextRequest) {
//     console.log("HEELLOOO FROM MIDDLEWARE!!!!!!!!!!!!!!!!!")

//     const res = NextResponse.next();

//     // Set CORS headers for the API route response
//     res.headers.append('Access-Control-Allow-Credentials', "true")
//     res.headers.append('Access-Control-Allow-Origin', 'https://world-recipes-made-yours.vercel.app')
//     res.headers.append('Access-Control-Allow-Methods', 'GET,POST, OPTIONS')
//     res.headers.append(
//         'Access-Control-Allow-Headers',
//         'Content-Type, Access-Control-Allow-Headers, Authorization'
//     )

//     if (req.method === 'OPTIONS') {
//         return new NextResponse(null, { status: 200 });
//     }

//     return res;
// }
