import mongoose, { Schema } from "mongoose";

const prepTimeSchema: Schema = new mongoose.Schema({
  gptValue: { type: String },
  name: { type: String },
  image: { type: String },
  parent: { type: String },
});

export default mongoose.models.PrepTime ||
  mongoose.model("PrepTime", prepTimeSchema);
