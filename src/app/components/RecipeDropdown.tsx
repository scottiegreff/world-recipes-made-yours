"use client";

import { useState, useEffect } from "react";
import Recipe from "../types/Recipe";

export default function RecipeDropdown({ data }: { data: Recipe[] }) {
  const [selectedRecipe, setSelectedRecipe] = useState("");

  // const recipeObj = Object.values(data);

  useEffect(() => {
    console.log("CHANGED RECIPE NAME", selectedRecipe);
  }, [selectedRecipe]);

  return (
    <>
      <label className="me-2" htmlFor="culture">
        Recipes:
      </label>
      <select
        value={selectedRecipe}
        onChange={(e) => setSelectedRecipe(e.target.value)}
        name="recipe"
        className="p-1 border rounded-lg border-black"
      >
        <option value="">Select a Recipe</option>
        {data.map((recipe) => (
          <option key={recipe._id} value={recipe.name}>
            {recipe.name}
          </option>
        ))}
      </select>
    </>
  );
}
