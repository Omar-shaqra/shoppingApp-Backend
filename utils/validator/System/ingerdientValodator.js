const { body } = require("express-validator");
const validatorMiddleware = require("../../../middlewares/validatormiddleware");

// Validation middleware
exports.ingredientvalidate = [
  body("name").notEmpty().withMessage("Name is required"),

  validatorMiddleware,
];
