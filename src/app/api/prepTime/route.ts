import connectMongoDB from "../../../utils/mongoose";
import PrepTime from "../../models/PrepTime";
import { NextRequest, NextResponse } from "next/server";

export const GET = async function (req: NextRequest) {
  if (req.method == "GET") {
    try {
      await connectMongoDB();
      const prepTime = await PrepTime.find();
      if (prepTime)
        return new NextResponse(JSON.stringify(prepTime), { status: 200 });
    } catch (error) {
      return new NextResponse(
        "Error in fetching FOOD PREF in loadDietPref/route.ts: " + error,
        { status: 500 }
      );
    }
  }
};
