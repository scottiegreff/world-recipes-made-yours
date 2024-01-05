"use client";
import React, { useRef, useEffect, useState } from "react";
import Toast from "./Toast";
import { useRouter } from "next/navigation";
import OpenAIResponse from "../interfaces/OpenAIResponse";
import Message from "../interfaces/Message";
import { useSession } from "next-auth/react";

export default function SaveRecipe({
  chatCompObj,
}: {
  chatCompObj: OpenAIResponse | undefined;
}) {
  const { data: session } = useSession();
  const user = session?.user;
  const router = useRouter();
  const [showToastForSavedRecipe, setShowToastForSavedRecipe] = useState(false);
  const [showToastForNoUser, setShowToastForNoUser] = useState(false);

  const handleSaveRecipe = async () => {
    if (!user) {
      setShowToastForNoUser(true);
      setTimeout(() => setShowToastForNoUser(false), 4000); // Hide the toast after 3 seconds
    }
    if (user) {
      const data = {
        newRecipe: chatCompObj?.choices?.[0].message.content,
      };
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/recipes`,
          {
            method: "PATCH",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );
        if (!res.ok) {
          throw new Error(`Error: ${res.status}`);
        }
        if (res.ok) {
          setShowToastForSavedRecipe(true);
          setTimeout(() => setShowToastForSavedRecipe(false), 3000); // Hide the toast after 3 seconds
        }
        const responseBody = await res.json();
        // if respone came back as status 200 render a div that displays the recipe was saved successfully
      } catch (error) {
        console.error(error);
        return new Response("Internal Server Error", { status: 500 });
      }
    }
  };

  return (
    <>
      <Toast
        message="You must Regiser OR Sign-In to SAVE RECIPES"
        show={showToastForNoUser}
      />
      <button
        className="md:w-50 md:mb-10 py-2 px-3 md:py-2 md:px-20 text-white bg-gray-800 border-2 border-green-600 rounded-3xl text-[.75rem] md:text-md md:font-md shadow-2xl active:scale-[.99] active:shadow-none transform transition duration-150 hover:bg-gray-700 hover:text-white hover:border-none"
        onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
          handleSaveRecipe()
        }
        // style={{
        //   color: user ? "gray" : "red",
        // }}
      >
        SAVE RECIPE
      </button>
      <Toast
        message="Your Recipe is now SAVED!"
        show={showToastForSavedRecipe}
      />
    </>
  );
}
