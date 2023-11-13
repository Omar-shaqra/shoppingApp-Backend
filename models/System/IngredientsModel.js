const mongoose = require("mongoose");

const IngredientsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
});

module.exports = mongoose.model("Ingredients", IngredientsSchema);
