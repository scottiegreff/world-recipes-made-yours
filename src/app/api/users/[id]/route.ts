// app/api/users/[id]/route.ts
import { NextRequest } from "next/server";
import connectMongoDB from "@/utils/mongoose";
import User from "@/app/models/User";

export async function GET(request: NextRequest) {
  // Extract the user ID from the dynamic route parameter
  const userId = request.nextUrl.pathname.split("/").pop();

  try {
    await connectMongoDB();
    // Use findOne to get a single user by ID
    const user = await User.findOne({ _id: userId });
    if (user) {
      // console.log("User found in GET:", user);
      return new Response(JSON.stringify(user), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      });
    } else {
      console.log("User not found");
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
  } catch (error) {
    console.error("Failed to fetch user:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

export async function PATCH(request: NextRequest) {
  // Extract the user ID from the dynamic route parameter
  const userId = request.nextUrl.pathname.split("/").pop();
  const { recipeObj } = await request.json();

  try {
    await connectMongoDB();
    // Use findOne to get a single user by ID
    const user = await User.findOneAndUpdate(
      { _id: userId },
      {
        $push: { recipes: recipeObj },
      },
      { new: true }
    );
    if (user) {
      // console.log("User found in PATCH:", user);
      return new Response(JSON.stringify(user), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      });
    } else {
      console.log("User not found");
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
  } catch (error) {
    console.error("Failed to fetch user:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
