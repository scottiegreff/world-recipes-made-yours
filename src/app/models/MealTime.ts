import mongoose, { Schema } from "mongoose";

const mealTimeSchema: Schema = new mongoose.Schema({
  gptValue: { type: String },
  name: { type: String },
  image: { type: String },
  parent: { type: String },
});

export default mongoose.models.MealTime ||
  mongoose.model("MealTime", mealTimeSchema);
