const mongoose = require("mongoose");

const IngredientsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  unit: {
    type: String,
    required: true,
    enum: ["grams", "kilograms"],
  },
});

module.exports = mongoose.model("Ingredients", IngredientsSchema);
