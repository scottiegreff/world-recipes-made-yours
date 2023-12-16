import mongoose, { Schema } from "mongoose";

const recipeSchema: Schema = new mongoose.Schema({
  recipe: { type: [String] },
});

export default mongoose.models.Nutrition ||
  mongoose.model("Recipe", recipeSchema);
