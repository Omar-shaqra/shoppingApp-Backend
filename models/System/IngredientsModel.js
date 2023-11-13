const mongoose = require("mongoose");

const IngredientsSchema = new mongoose.Schema({
  name: String,
  quantity: Number,
  unit: {
    type: String,
    enum: ["grams", "kilograms"],
  },
});

module.exports = mongoose.model("Ingredients", IngredientsSchema);
