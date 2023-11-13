const Ingredient = require("../../models/System/IngredientsModel");

module.exports = {
  // Create ingredient
  createIngredient: async (req, res) => {
    const { name, quantity, unit } = req.body;

    try {
      const ingredient = new Ingredient({
        name,
        quantity,
        unit,
      });

      await ingredient.save();

      res.json({ message: "Ingredient created" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Get single ingredient
  getOneIngredient: async (req, res) => {
    try {
      const ingredient = await Ingredient.findById(req.params.id);
      res.json(ingredient);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Get all ingredients
  getAllIngredient: async (req, res) => {
    try {
      const ingredients = await Ingredient.find();
      res.json(ingredients);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Update ingredient
  updateIngredient: async (req, res) => {
    // Update logic...
  },

  // Delete ingredient
  deleteIngredient: async (req, res) => {
    // Delete logic...
  },
};
