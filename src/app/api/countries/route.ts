import connectMongoDB from "../../../utils/mongoose";
import Country from "../../models/Country";
import { NextRequest, NextResponse } from "next/server";

export const GET = async function (req: NextRequest) {
  if (req.method == "GET") {
    try {
      await connectMongoDB();
      const country = await Country.find();

      if (country)
        return new NextResponse(JSON.stringify(country), { status: 200 });
    } catch (error) {
      return new NextResponse(
        "Error in fetching FOOD PREF in loadDietPref/route.ts: " + error,
        { status: 500 }
      );
    }
  }
};
