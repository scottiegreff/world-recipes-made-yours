import { NextRequest, NextResponse } from "next/server";

export const POST = async function (req: NextRequest, res: NextResponse) {
  if (req.method === "POST") {
    const body = await req.json();
    // get body from request
    const { currentUserInput, conversationHistory } = body;

    const openApiKey = process.env.OPENAI_API_KEY as string;

    const dataBody = {
      model: "gpt-4-1106-preview",
      max_tokens: 800,
      messages: [...conversationHistory, currentUserInput],
    };

    // Get the origin of the request
    // const origin = req.headers.get("Origin");
    
    const timeout = (ms: number) => {
      console.log("hellllllllo from timeout")
      return new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), ms));
    };

    const fetchWithTimeout = (url: RequestInfo | URL, options: object, timeoutMs: number) => {
      console.log("hellllllllo from fetchWithTimeout")
      return Promise.race([
        fetch(url, options),
        timeout(timeoutMs)
      ]);
    }

    try {
      console.log("hellllllllo from try block")
      const response: any = await fetchWithTimeout(  "https://api.openai.com/v1/chat/completions",  {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${openApiKey}`,
        },

        body: JSON.stringify(dataBody),
        // signal: controller.signal,
      }, 60000)
      
      
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
