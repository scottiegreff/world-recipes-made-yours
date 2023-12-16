"use client";
import { useState } from "react";

export default function AddRecipe() {
  const [name, setName] = useState<string>("");
  // handle the form submit to /api/selects/recipes

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const res = await fetch("http://localhost:3000/api/recipes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });
    if (res.ok) {
      console.log("Recipe added successfully!");
      setName("");
    } else {
      const error = await res.text();
      console.error(`Failed to add recipe: ${error}`);
    }
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  return (
    <form>
      <div>
        <label className="me-2" htmlFor="name">
          Add Recipe:
        </label>
        <input
          className="border border-black rounded p-1 me-3"
          type="text"
          id="name"
          value={name}
          onChange={handleNameChange}
        />

        <button
          className="border border-black rounded p-1"
          type="submit"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </form>
  );
}
