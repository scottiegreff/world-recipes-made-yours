import mongoose, { Schema } from "mongoose";

// Define the schema for the individual recipes
const recipeSchema = new mongoose.Schema({
  recipe: {
    type: String,
  },
});

// Define the user schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  image: { type: String },
  emailVerified: { type: Boolean },
  recipes: [recipeSchema], // Use the recipe schema for each item in the recipes array
});

// Export the model
const User = mongoose.model("User", userSchema);
export default User;
