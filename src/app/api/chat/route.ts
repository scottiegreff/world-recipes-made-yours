import { NextRequest, NextResponse } from "next/server";
// import middleware from "./_middleware";

export const POST = async function (req: NextRequest, res: NextResponse) {
  // Handle other methods (GET, POST, etc.)
  if (req.method === "POST") {
    const body = await req.json();
    // get body from request
    const { currentUserInput, conversationHistory } = body;

    const openApiKey = process.env.OPENAI_API_KEY as string;

    const dataBody = {
      model: "gpt-4-1106-preview",
      max_tokens: 8, //800
      messages: [...conversationHistory, currentUserInput],
    };
    try {
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${openApiKey}`,
          },
          body: JSON.stringify(dataBody),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return new NextResponse(JSON.stringify(data));
    } catch (error) {
      console.error(error);
      return new NextResponse("Internal Server Error", { status: 500 });
    }
  }
};
