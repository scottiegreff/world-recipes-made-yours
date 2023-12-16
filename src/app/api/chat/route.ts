import Message from "@/app/interfaces/Message";
import ChatRequestBody from "@/app/interfaces/ChatRequestBody";
import { NextRequest, NextResponse } from "next/server";

export const POST = async function (req: NextRequest) {
  const requestBody: ChatRequestBody = await req.json();

  // console.log("REQUEST BODY!!!!!!!!!", requestBody);
  const { currentUserInput, conversationHistory } = requestBody;
  const openApiKey = process.env.OPENAI_API_KEY as string;

  const data = {
    model: "gpt-4-1106-preview",
    max_tokens: 800,//800
    messages: [...conversationHistory, currentUserInput],
  };
  try {
    const openaiResponse = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${openApiKey}`,
        },
        body: JSON.stringify(data),
      }
    );
    const responseBody = await openaiResponse.json();
    return new NextResponse(JSON.stringify(responseBody), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
