import connectMongoDB from "../../../utils/mongoose";
import MealTime from "../../models/MealTime";
import { NextResponse, NextRequest } from "next/server";

export const GET = async function (req: NextRequest) {
  if (req.method == "GET") {
    try {
      await connectMongoDB();
      const mealTimes = await MealTime.find();
      if (mealTimes) {
        return new NextResponse(JSON.stringify(mealTimes), { status: 200 });
      }
    } catch (error) {
      return new NextResponse(
        "Error in fetching MEALTIMES in mealTimes/route.ts: " + error,
        { status: 500 }
      );
    }
  }
};
