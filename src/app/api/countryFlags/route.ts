import connectMongoDB from "../../../utils/mongoose";
import CountryFlag from "../../models/CountryFlag";
import { NextRequest, NextResponse } from "next/server";

export const GET = async function (req: NextRequest) {
  if (req.method == "GET") {
    try {
      await connectMongoDB();
      const flag = await CountryFlag.find();
      // console.log("CountryFLAG connectMongoDB:", flag);
      if (flag) return new NextResponse(JSON.stringify(flag), { status: 200 });
    } catch (error) {
      return new NextResponse(
        "Error in fetching RECIPES in flags/route.ts: " + error,
        { status: 500 }
      );
    }
  }
};

// export const POST = async function (req: NextRequest, res: NextResponse) {
//   if (req.method == "POST") {
//     try {
//       const body = await req.json();
//       const { name } = body;
//       await connectMongoDB();
//       const flag = await CountryFlag.create({ name });
//       console.log("Recipe:", flag);
//       return new NextResponse("POST request received", { status: 200 });
//     } catch (error) {
//       return new NextResponse(
//         "Error in POSTING RECIPES in flags/route.ts: " + error,
//         { status: 500 }
//       );
//     }
//   }
// };
