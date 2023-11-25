const Ingredient = require("../../models/System/IngredientsModel");

module.exports = {
  // Create ingredient
  createIngredient: async (req, res) => {
    const { name } = req.body;

    try {
      const ingredient = new Ingredient({
        name,
      });

      await ingredient.save();

      res.json({ message: "Ingredient created", data: ingredient });
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
    try {
      const ingredient = await Ingredient.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );
      res.status(200).json({
        status: "success",
        data: {
          ingredient,
        },
      });
    } catch (err) {
      res.status(404).json({
        status: "fail",
        message: err,
      });
    }
  },

  // Delete ingredient
  deleteIngredient: async (req, res) => {
    try {
      await Ingredient.findByIdAndDelete(req.params.id);
      res.status(204).json({
        status: "success",
        data: null,
      });
    } catch (err) {
      res.status(404).json({
        status: "fail",
        message: err,
      });
    }
  },
};
