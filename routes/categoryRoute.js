const express = require("express");

const {
  getCategoryValidator,
  createCategoryValidator,
  deleteCategoryValidator,
  updateCategoryValidator,
} = require("../utils/validator/categoryValidator");
const {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
  uploadCategoryImage,
  resizeImage,
} = require("../controllers/categoryControllers");

const router = express.Router();

router
  .route("/")
  .post(
    uploadCategoryImage,
    resizeImage,
    createCategoryValidator,
    createCategory
  )
  .get(getCategories);

router
  .route("/:id")
  .get(getCategoryValidator, getCategory)
  .put(updateCategoryValidator, updateCategory)
  .delete(deleteCategoryValidator, deleteCategory);

module.exports = router;
