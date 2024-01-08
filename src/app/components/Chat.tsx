'use client'

import { useState } from 'react'
import { useChat, useCompletion } from 'ai/react'
import { useDebouncedCallback } from 'use-debounce'
import styles from "./page.module.css"


export default function Chat() {

  const [chatMessage, setChatMessage] = useState('')
  const { messages, input, setInput, handleSubmit, handleInputChange } = useChat()

  const { complete, completion } = useCompletion({
    api: '/api/completion',
    onResponse: res => {
      console.log("!!!!!!!!!!!!!!!!!!!!!!!! RESPONSE: ",res)
      if (res.status === 429) {
        console.error('You are being rate limited. Please try again later.')
      }
    },
    onFinish: () => {
      console.log(completion)
      setInput(completion)
    }
  })
 
  const generateCompletion = useDebouncedCallback(e => {
    console.log("!!!!!!!!!!!!!!!!!!!!!!!! RESPONSE: ",chatMessage)
    complete(chatMessage)
  }, 500)

  const handleChatInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChatMessage(e.target.value)
    console.log("!!!!!!!!!!!!!!!!!!! setChatMsg ",e.target.value)
    handleInputChange(e)
  }

  const handleChatSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    handleSubmit(e)
    console.log("!!!!!!!!!!!!!!!!!!! setCha ",chatMessage)
    setChatMessage('')
  }

  return (
    <div className="chat">
      <h1 className={styles.chat_title}>Welcome to the AI Chatbot</h1>
      <div className={styles.message_content}>
        {messages.map((m) => (
          <div key={m.id}>
            <span>{m.role === 'user' ? 'me' : '🤖'}: </span>
            <span className={m.role === 'user' ? 'text-blue-400' : ''}>
              {m.content}
            </span>
          </div>
        ))}
      </div>
      <div className={styles.text_area}>
        <form onSubmit={(e) => handleChatSubmit(e)}>
          <input
            value={input}
            placeholder="Say something..."
            onChange={(e) => handleChatInputChange(e)}
            className={styles.input}
          />
        </form>
        <button onClick={generateCompletion}>Generate completion</button>
      </div>
    </div>
  )
}
// "use client"
// import SaveRecipe from "./SaveRecipe";
// import React, { useState, useEffect, useRef } from "react";
// import Message from "../interfaces/Message";
// import OpenAIResponse from "@/app/interfaces/OpenAIResponse";
// import RecipeDisplay from "./RecipeDisplay";
// import LoadingSpinner from "./LoadingSpinner";
// import OpenAI from 'openai';
// import { json } from "stream/consumers";
// import { useChat } from 'ai/react';


// export default function Chat({
//   userDietPrefArr,
// }: {
//   userDietPrefArr: string[];
// }) {

//   const submitGptBtnRef = useRef(null);
//   let result: OpenAIResponse | undefined = undefined;
//   const [chatCompObj, setChatCompObj] = useState<OpenAIResponse | undefined>(undefined);
//   let newHistory = [];
//   const [isFetching, setIsFetching] = useState(false);
//   let [digitOnly, setDigitOnly] = useState("");
//   const [reqCount, setReqCount] = useState(0)
//   const chatInputRef = useRef(null);
//   const gptDisplayRef =  useRef<HTMLInputElement>(null);
//   const { messages, input, isLoading, handleInputChange, handleSubmit } = useChat();
//   const [conversationHistory, setConversationHistory] = useState<any>([
//     {
//       role: "system",
//       content:
//         "You are a stuck up chef and like to mock others. You are to the point. Once in a while, you like to give a history lesson of an ingredient. You only respond with JSON data.",
//       // "A helpful recipe generator that gives technical and historical information about the ingredients and cooking techniques."
//     },
//   ]);
//   const [currentContent, setCurrentContent] = useState("");
//   // console.log("currentContent: ", currentContent);
//   useEffect(() => {
//     // let userDietPref = `Please give me 5 ${userDietPrefArr[2]} ${userDietPrefArr[0]} ${userDietPrefArr[4]} recipes to choose from. I am ${userDietPrefArr[1]} and I have ${userDietPrefArr[3]} to prepare the complete recipe.`;
//     const userDietPref = `bullet list in the format "#)Recipe Name - Short Description" of 10 ${userDietPrefArr[2]} ${userDietPrefArr[0]} ${userDietPrefArr[4]} recipes. They are to be ${userDietPrefArr[1]} and able to be made in ${userDietPrefArr[3]}`;
//     // const userDietPref = "Please give me a list of 5 Italian dinner recipes. I am meat eater that is looking for comfort food and I have 1 hour to prepare the complete recipe.";
   
//       //change the value of the current ref
//       // const chatInputRef = useRef<HTMLInputElement>(null);
//       // chatInputRef.current?.setAttribute('value', userDietPref);

//     setCurrentContent(userDietPref);

//   }, [userDietPrefArr]);

//   const handleAPISubmit = async () => {
    
//     setIsFetching(true);
//     setReqCount(reqCount + 1);
//     console.log("reqCount: ", reqCount);
//     // if(reqCount === 1) {
//     //   requestBody = {
//     //     role: "user",
//     //     constent: `reply in JSON format of { 'Recipe Name': 'Short Description' } of 10 ${userDietPrefArr[2]} ${userDietPrefArr[0]} ${userDietPrefArr[4]} recipes. They are to be ${userDietPrefArr[1]} and able to be made in ${userDietPrefArr[3]}`
//     //   }


//       const requestBody = {
//       currentUserInput: { role: "user", content: currentContent },
//       conversationHistory,
//     };
   
//   }


//   return (
//     <div>
//       {messages.map(m => (
//         <div key={m.id}>
//           {m.role === 'user' ? 'User: ' : 'AI: '}
//           {m.content}
//         </div>
//       ))}
 
//       <form onSubmit={handleSubmit}>
//         <label>
        
//           <input className="w-full h-20"  onChange={handleInputChange} value={input} />
//         </label>
//         <button className="my-20 md:w-50 md:mb-10 py-2 px-3 md:py-2 md:px-20 bg-slate-800 text-white border-2 border-green-800 rounded-3xl text-[1rem] md:text-md md:font-md shadow-yellow-400 active:scale-[.99] active:shadow-none transform transition duration-150 hover:text-white hover:bg-slate-800 hover:border-none"
//         >GET RECIPE IDEAS</button>
//       </form>
//     </div>
//   );
// }

  // const handleAPISubmit = async () => {
  //   setIsFetching(true);

  //   const requestBody = {
  //     currentUserInput: { role: "user", content: currentContent },
  //     conversationHistory,
  //   };
// 
    // const apiRoute = new URL(`${process.env.NEXT_PUBLIC_BASE_URL}/api/chat`);
// 
  //   await fetch(apiRoute, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(requestBody),
  //   })
  //     .then((response) => {
  //       if (!response.ok) {
  //         // Handle response errors
  //         throw new Error(`HTTP error! Status: ${response.status}`);
  //       } 
  //       return response.json(); // Parse JSON response
  //     })
  //     .then((data) => {
  //       result = data;
  //       setChatCompObj(result)
  //     })
  //     .catch((error) => {
  //       console.error("Error during fetch:", error); // Handle any errors that occurred during fetch
  //     });

  //   // setChatCompObj(result);
  //   // setIsFetching(false);
  //   setConversationHistory((prevHistory) => {
  //     // Construct a new array with the previous history and the new user input
  //     newHistory = [
  //       ...prevHistory,
  //       ...(result?.choices ?? []).map((choice) => {
  //         return {
  //           role: choice.message.role,
  //           content: choice.message.content,
  //         };
  //       }),
  //     ];
  //     console.log("newHistory: ", newHistory);
  //     return newHistory;
  //   });
  // };

//   const clearChatConvo = () => {
//     setConversationHistory([
//       {
//         role: "system",
//         content:
//           "You are a stuck up chef and like to mock others. You are to the point. Once in a while, you like to give a history lesson of an ingredient.",
//         // "A helpful recipe generator that gives technical and historical information about the ingredients and cooking techniques."
//       },
//     ]);
//     setCurrentContent("");
//     setChatCompObj(undefined);
//     setIsFetching(false);
//   };

//   useEffect(() => {
//     if(chatCompObj)
//       setIsFetching(false);
//   }, [chatCompObj]);

//   // Event handler for key down in textarea
//   const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
//     // Check if the Enter key was pressed
//     if (event.key === "Enter") {
//       // Prevent the default action to avoid form submission or newline insertion
//       event.preventDefault();
//       // Call the button click handler
//       handleAPISubmit();
//     }
//   };

//   if (!isFetching && chatCompObj) {
//     return (
//       // shows the recipe ideas
//       <>
//         <div className="flex flex-col justify-center items-center mb-[20vh]">
//           <div ref={gptDisplayRef} className="flex flex-col justify-center items-center mb-10">
//             <h1 className="text-2xl md:text-4xl font-bold mb-5">Recipe Ideas</h1>
//             <p className="text-sm md:text-lg font-light mb-5">
//               {/* {chatCompObj?.choices[0].text} */}
//             </p>
//           </div>
//           {/* <RecipeDisplay chatCompObj={chatCompObj} /> */}
//           <label className="mb-3 text-sm md:text-lg font-light">
//             Enter Recipe <span className="font-bold text-2xl">#</span> for
//             Ingredients & Technique
//           </label>

//           <textarea
//             name="message"
//             className="border rounded-xl text-center border-black w-20 h-10 md:h-10 p-1 mb-10 md:text-xl"
//             placeholder="#"
//             onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
//               digitOnly = event.target.value.replace(/\D/g, "");
//               setCurrentContent(
//                 `Please give me # ` +
//                   digitOnly +
//                   ` in the format "Recipe: (Recipe Name) /n Description: (description) /n Ingredients: (list of ingedients), /n Technique: (detailed technique)`
//               );
//             }}
//             onKeyDown={handleKeyDown}
//           ></textarea>

//           <button
//            className="mb-20 md:w-50 py-2 px-3 md:py-2 md:px-20 bg-gray-600 text-white border-2 border-green-600 rounded-3xl text-[.75rem] md:text-md md:font-md shadow-2xl active:scale-[.99] active:shadow-none transform transition duration-150 hover:bg-gray-700 hover:border-none"
//             onClick={handleAPISubmit}
//           >
//             GET RECIPE
//           </button>
//           <button
//             className="md:w-50 md:mb-10 py-2 px-3 md:py-2 md:px-20 text-white bg-gray-800 border-2 border-red-400 rounded-3xl text-[.75rem] md:text-md md:font-md shadow-2xl active:scale-[.99] active:shadow-none transform transition duration-150 hover:text-white hover:bg-gray-700 hover:border-none"
//             onClick={clearChatConvo}
//           >
//             START OVER
//           </button>
          

       
//               <SaveRecipe chatCompObj={chatCompObj} />
       
        
//         </div>
//       </>
//     );
//   }

//   else if (!isFetching && !chatCompObj) {
//     return (
//       <>
//         <div className="flex justify-center items-center">
//           <button
//            className="my-20 md:w-50 md:mb-10 py-2 px-3 md:py-2 md:px-20 bg-slate-800 text-white border-2 border-green-800 rounded-3xl text-[1rem] md:text-md md:font-md shadow-yellow-400 active:scale-[.99] active:shadow-none transform transition duration-150 hover:text-white hover:bg-slate-800 hover:border-none"
//             // className="my-20 p-2 bg-white text-black rounded-3xl border border-black text-lg font-light px-[5%] shadow-2xl shadow-yellow-400 active:scale-[.99] active:shadow-none transform transition duration-150 hover:bg-gray-900 hover:text-white hover:shadow-white"
//             onClick={handleAPISubmit}
//           >
//             GET RECIPE IDEAS
//           </button>
//         </div>
//       </>
//     );
//   }
//   else if (isFetching) {
//     return (
//       <>
//         <LoadingSpinner />
//       </>
//     );
//   }
  
// }
