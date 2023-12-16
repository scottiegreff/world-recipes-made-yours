"use client";
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
      setUserRecipes(userData);
      setError(null);
    } catch (error: any) {
      setError(error.message);
      setUserRecipes([]);
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
  // Regex to check if the string starts with a number and the a parentheses

  // Split the string into an array divided by numbers
  if (userRecipes === undefined) return <></>;
  const splitArray = userRecipes?.map((item) => item.split(/\n/g));
  return (
    <>
      <div className="flex justify-center items-center">
        <button
          className="mb-10 py-2 px-7 bg-gray-600 text-white border border-red-100 rounded-3xl text-md font-md shadow-2xl active:scale-[.99] active:shadow-none transform transition duration-150 hover:bg-gray-700 hover:border-none"
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
            className="mb-20 py-2 px-7 bg-gray-600 hover:bg-gray-700 hover:border-none text-red-400 border border-red-100 rounded-3xl text-md font-md shadow-2xl active:scale-[.99] active:shadow-none transform transition duration-150"
            onClick={closeRecipes}
          >
            CLOSE RECIPES
          </button>

          <h1 className="text-2xl font-bold mb-10">Your Saved Recipes</h1>

          <ul className="flex flex-col justify-center items-center">
            {splitArray?.map((item: any, index: any) => {
              return (
                <li
                  key={index}
                  className="flex flex-col justify-start items-start mb-10"
                >
                  {item.map((item: any, index: any) => {
                    // item[0] then make the font bold

                    if (item[0] === "R") {
                      return (
                        <p className="text-3xl font-bold my-2" key={index}>
                          {item}
                        </p>
                      );
                    } else {
                      return (
                        <p className="text-md my-2" key={index}>
                          {item}
                        </p>
                      );
                    }

                    // return (
                    //   <p className="text-md my-2" key={index}>
                    //     {item}
                    //   </p>
                    // );
                  })}
                </li>
              );
            })}
          </ul>

          <button
            // ref={closeRecipesBtn}
            className="mb-20 py-2 px-7 bg-black text-red-400 rounded-3xl text-md font-md shadow-2xl active:scale-[.99] active:shadow-none transform transition duration-150 hover:bg-gray-900"
            onClick={closeRecipes}
          >
            CLOSE RECIPES
          </button>
        </div>
      )}
    </>
  );
}

// (
//   <li key={index} className="mb-10 lg:mb-20 w-[90%] md:w-[70%] text-xl">
//     <h3 className="text-xl font-bold mb-5">Recipe {index + 1}</h3>
//     {recipe}
//     <hr className="my-10 w-[80vw]" />
//   </li>
// ))}
// </ul>
