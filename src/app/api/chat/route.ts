import { NextRequest, NextResponse } from "next/server";
// import { middleware } from "../../../middleware"

export const POST = async function (req: NextRequest, res: NextResponse) {
   // Call the middleware at the beginning of the route handler
  //  const corsResponse = middleware(req);
  //  if (corsResponse) {
  //   return corsResponse;
  //  }
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
    // Get the origin of the request
    // const origin = req.headers.get('Origin');
    // console.log  ("ORIGIN: ", origin)
    // const getMiddleware = middleware(req);
    const origin = req.headers.get("Origin");
    try {
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers:
            {
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
    
      return new NextResponse(JSON.stringify(data),{
      headers: {
        "Access-Control-Allow-Origin": origin || "https://www.worldrecipesmade.com/",
        "Access-Control-Allow-Methods": "GET,OPTIONS,PATCH,DELETE,POST",
        "Access-Control-Alloow-PreflightContinue": "false",
        "Access-Control-Allow-Headers": "Content-Type, Access-Key, Authorization, Origin, X-Requested-With, Accept",
        "Access-Control-Allow-Credentials": "true",

      }});
    } catch (error) {
      console.error(error);
      return new NextResponse("Internal Server Error", { status: 500 });
    }
  }
};
