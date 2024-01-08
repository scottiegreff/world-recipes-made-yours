// ./app/api/chat/route.ts

import { Configuration, OpenAIApi } from 'openai-edge'
import { OpenAIStream, StreamingTextResponse } from 'ai'

// Create an OpenAI API client (that's edge friendly!)
const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
})
const openai = new OpenAIApi(config)

// IMPORTANT! Set the runtime to edge
export const runtime = 'edge'

export async function POST(req: Request) {
  // Extract the `prompt` from the body of the request
  const { messages } = await req.json()

  // Ask OpenAI for a streaming chat completion given the prompt
  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages: messages.map((message: any) => ({
      content: message.content,
      role: message.role
    }))
  })

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response, {
    onCompletion:async (completion:string) => {
      await console.log('Chat completed')
    }
  })
  // Respond with the stream
  return new StreamingTextResponse(stream)
}


// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
//   organization:  "org-L5VgsnBIwfE4BmB35VkzKLVT"
// });

// export async function POST (req: Request, res: Response) {
//   const { messages } = await req.json();
//   console.log("messages: ", messages);
//   if (req.method === "POST") {
 
//     const body = await req.json();
//     const { currentUserInput, conversationHistory } = body;

//     const openApiKey = process.env.OPENAI_API_KEY as string;

//     // // console.log("openApiKey!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!: ", openApiKey);
//     // const openai = new OpenAI({
//     //   apiKey: openApiKey,
//     //   organization: 'org-L5VgsnBIwfE4BmB35VkzKLVT',
//     // });
  
    
  
    

//     const dataBody = {
//       model: "gpt-4-1106-preview",
//       max_tokens: 50,
//       stream: true, // stream back partial messages as they are generated
//       messages: [...conversationHistory, currentUserInput],
//     };



//   // try{
//   //   const stream = await openai.chat.completions.create({
//   //     model: 'gpt-4',
//   //     max_tokens: 200,
//   //     messages: [...conversationHistory, currentUserInput],
//   //     stream: true,
//   //   });
//   //   for await (const chunk of stream) {
//   //     return new NextResponse (JSON.stringify(process.stdout.write(chunk.choices[0]?.delta?.content || '')));
//   //   }

//   // }
//   // catch (error) {
//   //   console.error(error);
//   // }

   

//     // try {
//     //   const response = await fetch("https://api.openai.com/v1/chat/completions", {
//     //     method: "POST",
//     //     headers: {
//     //       "Content-Type": "application/json",
//     //       Authorization: `Bearer ${openApiKey}`,
//     //     },
//     //     body: JSON.stringify(dataBody),
//     //   });

//     //   if (!response.ok) {
//     //     throw new Error(`HTTP error! status: ${response.status}`);
//     //   }

//     //   const data = await response.json();
//     //   console.log("data from openai???????????????", data);
//     //   return new NextResponse(JSON.stringify(data), { status: 200 });
//     // } catch (error) {
//     //   if ((error as Error).name === "AbortError") {
//     //     console.log("Fetch request timed out");
//     //   }
//     //   console.error(error);
//     //   return new NextResponse("Internal Server Error", { status: 500 });
//     // }
  
//   }
// };


  // Get the origin of the request
    // const origin = req.headers.get("Origin");
    
    // const timeout = (ms: number) => {
    //   return new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), ms));
    // };

    // const fetchWithTimeout = (url: RequestInfo | URL, options: object, timeoutMs: number) => {
    //   return Promise.race([
    //     fetch(url, options),
    //     timeout(timeoutMs)
    //   ]);
    // }
    // const response: any = await fetchWithTimeout(  "https://api.openai.com/v1/chat/completions",  {


//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
//       // const data = await response.json();
      
//       const data = response.json();
//       console.log("data from openai???????????????", data);
//       return new NextResponse(JSON.stringify(data), { status: 200 });
//     }
//     )
//     } catch (error) {
//       if ((error as Error).name === "AbortError")
//         console.log("Fetch request timed out");
//       console.error(error);
//       return new NextResponse("Internal Server Error", { status: 500 });
//     }
//   }
// };
