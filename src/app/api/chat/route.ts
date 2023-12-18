import Message from "@/app/interfaces/Message";
import ChatRequestBody from "@/app/interfaces/ChatRequestBody";
import { NextRequest, NextResponse } from "next/server";

export const POST = async function (req: NextRequest) {
  const requestBody: ChatRequestBody = await req.json();

  // console.log("REQUEST BODY!!!!!!!!!", requestBody);
  const { currentUserInput, conversationHistory } = requestBody;
  const openApiKey = process.env.OPENAI_API_KEY as string;

  const dataBody = {
    model: "gpt-4-1106-preview",
    max_tokens: 800, //800
    messages: [...conversationHistory, currentUserInput],
  };
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${openApiKey}`,
      },
      body: JSON.stringify(dataBody),
    }).then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    });
    const data = await response;
    return new NextResponse(JSON.stringify(data), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin":
          "https://www.worldrecipesmade.com, https://worldrecipesmade.com, https://worldrecipesmade.com/members , http://localhost:3000, https://world-recipes-made-yours.vercel.app",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
