const { body } = require("express-validator");
const validatorMiddleware = require("../../../middlewares/validatormiddleware");

// Validation middleware
exports.ingredientvalidate = [
  body("name").notEmpty().withMessage("Name is required"),

  body("quantity")
    .isFloat({ min: 0 })
    .withMessage("Quantity must be a number greater than or equal to 0"),

  body("unit")
    .isIn(["grams", "kilograms"])
    .withMessage("Unit must be grams or kilograms"),

  validatorMiddleware,
];
