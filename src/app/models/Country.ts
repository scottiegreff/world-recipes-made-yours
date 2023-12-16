import mongoose, { Schema } from "mongoose";

const countrySchema: Schema = new Schema({
  countryNames: { type: [String], required: true },
});

export default mongoose.models.Country ||
  mongoose.model("Country", countrySchema);
