import connectMongoDB from "../../../utils/mongoose";
import Nutrition from "../../models/Nutrition";
import { NextRequest, NextResponse } from "next/server";

export const GET = async function (req: NextRequest) {
  if (req.method == "GET") {
    try {
      await connectMongoDB();
      const nutrition = await Nutrition.find();
      if (nutrition)
        return new NextResponse(JSON.stringify(nutrition), { status: 200 });
    } catch (error) {
      return new NextResponse(
        "Error in fetching FOOD PREF in loadDietPref/route.ts: " + error,
        { status: 500 }
      );
    }
  }
};
