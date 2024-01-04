"use client";
import { Delete } from "lucide-react";
import { useRef, useState } from "react";

export default function GetUsersRecipe() {
  const [userRecipes, setUserRecipes] = useState<String[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const recipeDisplay = useRef<HTMLDivElement>(null);
  const closeRecipesBtn = useRef<HTMLButtonElement>(null);

  const handleFetchUser = async () => {
    try {
      const response = await fetch("api/recipes/", {
        method: "GET",
      });
      if (!response.ok) { 
        throw new Error(`Error: ${response.status}`);
      }
      const userData = await response.json();
      console.log("USER DATA: ", userData);
      setUserRecipes(userData);
      setError(null);
    } catch (error: any) {
      setError(error.message);
      setUserRecipes(null);
    }
    recipeDisplay.current?.classList.remove("hidden");
    recipeDisplay.current?.classList.add("flex");

    // closeRecipesBtn.current?.classList.remove("hidden");
    closeRecipesBtn.current?.classList.add("flex");
    closeRecipesBtn.current?.classList.add("flex-col");
  };

  const closeRecipes = () => {
    recipeDisplay.current?.classList.remove("flex");
    recipeDisplay.current?.classList.add("hidden");
    closeRecipesBtn.current?.classList.remove("flex");
    closeRecipesBtn.current?.classList.add("hidden");
  };

  const deleteRecipe = async () => {
    try {
      const response = await fetch("api/recipes/", {
        method: "DELETE",

      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const userData = await response.json();
      setUserRecipes(userData);
      setError(null);
    } catch (error: any) {
      setError(error.message);
      setUserRecipes([]);
    }
  };

  // Regex to check if the string starts with a number and the a parentheses

  // Split the string into an array divided by numbers

  console.log("USER RECIPES: ", userRecipes);
  const splitArray = userRecipes?.map((item, key) => item.split(/\n/g));
  // if (splitArray?.length === 0) {
  //   return (
     
  //     <>
  //      <h1 className="text-2xl font-bold mb-10">Your Have NO Saved Recipes!</h1>
  //     </>
  //   );
  // }
  // else
  return (
    <>
      <div className="flex justify-center items-center">
        <button
          className="md:w-50 z-[-50] md:mb-10 py-2 px-3 md:py-2 md:px-7 bg-gray-600 text-white border border-red-100 rounded-3xl text-[.75rem] md:text-md md:font-md shadow-2xl active:scale-[.99] active:shadow-none transform transition duration-150 hover:bg-gray-700 hover:border-none"
          onClick={handleFetchUser}
        >
          GET YOUR SAVED RECIPES
        </button>
        {error && <p>Error: {error}</p>}
      </div>

      {userRecipes && (
        <div
          ref={recipeDisplay}
          className="flex flex-col justify-center items-center mt-10 mb-10"
        >
          <button
            // ref={closeRecipesBtn}
            className="md:w-50 mb-20 py-2 px-3 md:py-2 md:px-7 bg-gray-600 text-white border border-red-100 rounded-3xl text-[.75rem] md:text-md md:font-md shadow-2xl active:scale-[.99] active:shadow-none transform transition duration-150 hover:bg-gray-700 hover:border-none"
            onClick={closeRecipes}
          >
            CLOSE RECIPES
          </button>

          <h1 className="text-2xl font-bold mb-10">Your Saved Recipes</h1>

          <ul className="flex flex-col justify-center items-center">
            {splitArray?.map((item: any, index: number) => {
              return (
                <>
                  <li
                    key={index}
                    className="flex flex-col justify-start items-start mb-10"
                  >
                    {item.map((item: string, index: number) => {
                      // item[0] then make the font bold
                      if (item[0] === "R") {
                        return (
                          <>
                          <p
                            className="text-3xl font-bold mt-20 mb-10 text-green-600"
                            key={index}
                          >
                            <hr className="mb-20 w-[80vw]" />
                            {item}
                          </p>
                             
                          </>
                        );
                      } else {
                        return (
                          <p className="text-md my-2" key={index}>
                            {item}
                          </p>
                        ); 
                      }
                    })}
                  </li>{" "}
                </>
              );
            }
          )}
          </ul>
          <button
          className="md:w-50 mb-20 py-2 px-3 md:py-2 md:px-7 bg-gray-600 text-white border border-red-100 rounded-3xl text-[.75rem] md:text-md md:font-md shadow-2xl active:scale-[.99] active:shadow-none transform transition duration-150 hover:bg-gray-700 hover:border-none"
          onClick={deleteRecipe}
        >
          DELETE RECIPE
        </button>
          <button
            // ref={closeRecipesBtn}
            className="md:w-50 mb-20 py-2 px-3 md:py-2 md:px-7 bg-gray-600 text-white border border-red-100 rounded-3xl text-[.75rem] md:text-md md:font-md shadow-2xl active:scale-[.99] active:shadow-none transform transition duration-150 hover:bg-gray-700 hover:border-none"
            onClick={closeRecipes}
          >
            CLOSE RECIPES
          </button>
        </div>
      )}
    </>
  );
}

