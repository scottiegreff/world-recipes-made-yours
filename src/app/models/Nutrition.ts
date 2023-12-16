import mongoose, { Schema } from "mongoose";

const nutritionSchema: Schema = new mongoose.Schema({
  gptValue: { type: String },
  name: { type: String },
  image: { type: String },
  parent: { type: String },
});

export default mongoose.models.Nutrition ||
  mongoose.model("Nutrition", nutritionSchema);
