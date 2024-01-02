import { NextRequest, NextResponse } from "next/server";

export const POST = async function (req: NextRequest, res: NextResponse) {
  if (req.method === "POST") {
    const body = await req.json();
    // get body from request
    const { currentUserInput, conversationHistory } = body;

    const openApiKey = process.env.OPENAI_API_KEY as string;

    const dataBody = {
      model: "gpt-4-1106-preview",
      max_tokens: 800, //800
      messages: [...conversationHistory, currentUserInput],
    };

    // Get the origin of the request
    const origin = req.headers.get("Origin");

    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => {
        controller.abort();
      }, 60000);
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${openApiKey}`,
          },

          body: JSON.stringify(dataBody),
          signal: controller.signal,
        }
      );
      clearTimeout(timeout);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      return new NextResponse(JSON.stringify(data));
    } catch (error) {
      if ((error as Error).name === "AbortError")
        console.log("Fetch request timed out");
      console.error(error);
      return new NextResponse("Internal Server Error", { status: 500 });
    }
  }
};
