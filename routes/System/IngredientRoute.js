const router = require("express").Router();
const {
  ingredientvalidate,
} = require("../../utils/validator/System/ingerdientValodator");
const {
  createIngredient,
  getAllIngredient,
  getOneIngredient,
  updateIngredient,
  deleteIngredient,
} = require("../../controllers/System/ingredientController");

router
  .route("/")
  .get(getAllIngredient)
  .post(ingredientvalidate, createIngredient);
router
  .route("/:id")
  .get(getOneIngredient)
  .put(ingredientvalidate, updateIngredient)
  .delete(deleteIngredient);

module.exports = router;
