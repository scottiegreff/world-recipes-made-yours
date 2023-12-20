"use client";
import SaveRecipe from "./SaveRecipe";
import React, { useState, useEffect, useRef } from "react";
import Message from "../interfaces/Message";
import OpenAIResponse from "@/app/interfaces/OpenAIResponse";
import RecipeDisplay from "./RecipeDisplay";
import LoadingSpinner from "./LoadingSpinner";

export default function ChatGPT({
  userDietPrefArr,
}: {
  userDietPrefArr: string[];
}) {
  const submitGptBtnRef = useRef(null);
  let result: OpenAIResponse | undefined = undefined;
  const [chatCompObj, setChatCompObj] = useState<OpenAIResponse | undefined>(undefined);
  let newHistory = [];
  const [isFetching, setIsFetching] = useState(false);
  const [isGettingRecipes, setIsGettingRecipes] = useState(false);
  let [digitOnly, setDigitOnly] = useState("");

  const [conversationHistory, setConversationHistory] = useState<Message[]>([
    {
      role: "system",
      content:
        "You are a stuck up chef and like to mock others. You are to the point. Once in a while, you like to give a history lesson of an ingredient.",
      // "A helpful recipe generator that gives technical and historical information about the ingredients and cooking techniques."
    },
  ]);
  const [currentContent, setCurrentContent] = useState("");
  // console.log("currentContent: ", currentContent);
  useEffect(() => {
    // let userDietPref = `Please give me 5 ${userDietPrefArr[2]} ${userDietPrefArr[0]} ${userDietPrefArr[4]} recipes to choose from. I am ${userDietPrefArr[1]} and I have ${userDietPrefArr[3]} to prepare the complete recipe.`;
    const userDietPref = `bullet list in the format "#)Recipe Name - Short Description" of 10 ${userDietPrefArr[2]} ${userDietPrefArr[0]} ${userDietPrefArr[4]} recipes. They are to be ${userDietPrefArr[1]} and able to be made in ${userDietPrefArr[3]}`;
    // const userDietPref = "Please give me a list of 5 Italian dinner recipes. I am meat eater that is looking for comfort food and I have 1 hour to prepare the complete recipe.";
    setCurrentContent(userDietPref);
  }, [userDietPrefArr]);

  const handleAPISubmit = async () => {
    // event.preventDefault();
    setIsGettingRecipes(true);
    setIsFetching(true);

    const requestBody = {
      currentUserInput: { role: "user", content: currentContent },
      conversationHistory,
    };

    const apiUrl = new URL(`${process.env.NEXT_PUBLIC_BASE_URL}/api/chat`);

    await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => {
        if (!response.ok) {
          // Handle response errors
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json(); // Parse JSON response
      })
      .then((data) => {
        result = data;
        setChatCompObj(result)
        console.log("DATA FROM THE CLIENT:!!!!!!!!!!!!!!!!!!!!!", data); // Handle the data from the response
      })
      .catch((error) => {
        console.error("Error during fetch:", error); // Handle any errors that occurred during fetch
      });

    // setChatCompObj(result);
    // setIsFetching(false);
    setConversationHistory((prevHistory) => {
      // Construct a new array with the previous history and the new user input
      newHistory = [
        ...prevHistory,
        ...(result?.choices ?? []).map((choice) => {
          return {
            role: choice.message.role,
            content: choice.message.content,
          };
        }),
      ];
      return newHistory;
    });
  };

  useEffect(() => {
    if(chatCompObj)
      setIsFetching(false);
  }, [chatCompObj]);

  // Event handler for key down in textarea
  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Check if the Enter key was pressed
    if (event.key === "Enter") {
      // Prevent the default action to avoid form submission or newline insertion
      event.preventDefault();
      // Call the button click handler
      handleAPISubmit();
    }
  };

  if (!isFetching && chatCompObj) {
    return (
      // shows the recipe ideas
      <>
        <div className="flex flex-col justify-center items-center mb-[20vh]">
          <RecipeDisplay chatCompObj={chatCompObj} />
          <label className="mb-3 text-sm md:text-lg font-light">
            Enter Recipe <span className="font-bold text-2xl">#</span> for
            Ingredients & Technique
          </label>

          <textarea
            name="message"
            className="border rounded-xl text-center border-black w-20 h-10 md:h-10 p-1 mb-5 md:text-xl"
            placeholder="#"
            onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
              digitOnly = event.target.value.replace(/\D/g, "");
              setCurrentContent(
                `Please give me # ` +
                  digitOnly +
                  ` in the format "Recipe: (Recipe Name) /n Description: (description) /n Ingredients: (list of ingedients), /n Technique: (detailed technique)`
              );
            }}
            onKeyDown={handleKeyDown}
          ></textarea>

          <button
            className="p-2 mb-10 bg-white text-black border border-black rounded-3xl text-md font-md px-[6%] shadow-2xl active:scale-[.99] active:shadow-none transform transition duration-150 hover:bg-gray-400"
            onClick={handleAPISubmit}
          >
            GET RECIPE
          </button>

          {chatCompObj === undefined ? (
            <>{console.log("chatCompObj1: ", chatCompObj)}</>
          ) : (
            <>
              <SaveRecipe chatCompObj={chatCompObj} />
            </>
          )}
        </div>
      </>
    );
  }

  else if (!isFetching && !chatCompObj) {
    return (
      <>
        <div className="flex justify-center items-center">
          <button
            className="my-20 p-2 bg-white text-black rounded-3xl border border-black text-lg font-light px-[5%] shadow-2xl shadow-yellow-400 active:scale-[.99] active:shadow-none transform transition duration-150 hover:bg-gray-900 hover:text-white hover:shadow-white"
            onClick={handleAPISubmit}
          >
            GET RECIPE IDEAS
          </button>
        </div>
      </>
    );
  }
  else if (isFetching) {
    return (
      <>
        <LoadingSpinner />
      </>
    );
  }
  
}
