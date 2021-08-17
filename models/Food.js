// Import Mongoose
const mongoose = require("mongoose");

// Pull Schema and model from mongoose
const Schema = mongoose.Schema;
const model = mongoose.model;

// Create Place Schema
const placeSchema = new Schema(
  {
    name: String,
    img: String,
    taste: String,
  },
  { timestamps: true }
);

// Create our Model Object
const Place = model("Place", placeSchema);

// Export our Model Object
module.exports = Place;