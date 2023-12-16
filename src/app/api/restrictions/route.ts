import connectMongoDB from "../../../utils/mongoose";
import Restriction from "../../models/Restriction";
import { NextRequest, NextResponse } from "next/server";

export const GET = async function (req: NextRequest) {
  if (req.method == "GET") {
    try {
      await connectMongoDB();
      const restriction = await Restriction.find();
      if (restriction)
        return new NextResponse(JSON.stringify(restriction), { status: 200 });
    } catch (error) {
      return new NextResponse(
        "Error in fetching FOOD PREF in loadDietPref/route.ts: " + error,
        { status: 500 }
      );
    }
  }
};
