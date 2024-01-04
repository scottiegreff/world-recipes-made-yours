import React from "react";
import OpenAIResponse from "@/app/interfaces/OpenAIResponse";

export default function RecipeDisplay({
  chatCompObj,
}: {
  chatCompObj: OpenAIResponse | undefined;
}) {
  // Regex to check if the string starts with a number and the a parentheses
  const regex = /(\d+\))/g || /Recipe:/g;
  // Split the string into an array divided by numbers
  if (chatCompObj?.choices[0].message.content === undefined) return <></>;
  const splitArray = chatCompObj?.choices[0].message.content.split(regex);

  return (
    <div className="mt-10 mb-[20vh] p-4 text-xl md:text-xl  font-md">

      <ul className="mt-10 font-light">
      <h3 className="font-semibold text-2xl">Recipe:</h3>
        {splitArray?.map((item: any, index: any) => {
          // Check if 'item' is a number using the regex
          if (/(\d+\))/g.test(item)) {
            // Render item as a list element if it's a number
            return (
              <li className="font-semibold mt-10" key={index}>
                {item}
              </li>
            );
          } else if (
            /Recipe:/.test(item) ||
            /Description:/.test(item) ||
            /Ingredients:/.test(item) ||
            /Technique:/.test(item)
          ) {
            <h3 className="font-semibold text-2xl">Recipe</h3>
            // using a regex of "/n" spit the item and push the results into an array
            const recipeArray = [];
            for (let i = 0; i < item.length; i++) {
              if (item[i] === "\n") {
                recipeArray.push(item.slice(0, i));
                item = item.slice(i + 1);
                i = 0;
              }
            }
            recipeArray.push(item);
            console.log("recipeArray", recipeArray);

            return (
              <div className="mt-5" key={index}>
                {recipeArray.map((item: any, index: any) => {
                  return (
                    <p className="mt-10" key={index}>
                      {item}
                    </p>
                  );
                })}
              </div>
            );
          } else {
            // Just return the text if it's not a number
            return (
              <span className="m-5" key={index}>
                {item}
              </span>
            );
          }
        })}
      </ul>
    </div>
  );
}
