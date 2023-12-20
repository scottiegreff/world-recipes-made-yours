
// app/api/chat/_middleware.ts
import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
    console.log("HEELLOOO FROM MIDDLEWARE!!!!!!!!!!!!!!!!!")

    const res = NextResponse.next();
   
    // Set CORS headers for the API route response
    res.headers.append('Access-Control-Allow-Credentials', "true")
    res.headers.append('Access-Control-Allow-Origin', 'https://www.worldrecipesmade.com, https://world-recipes-made-yours.vercel.app') 
    res.headers.append('Access-Control-Allow-Methods', 'GET,POST, OPTIONS')
    res.headers.append(
        'Access-Control-Allow-Headers',
        'Content-Type, Access-Control-Allow-Headers, Authorization'
    )

    if (req.method === 'OPTIONS') {
        return new NextResponse(null, { status: 200 });
    }

    return res;
}
