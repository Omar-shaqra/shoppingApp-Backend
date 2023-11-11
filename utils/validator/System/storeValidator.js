const { check } = require("express-validator");
const validatorMiddleware = require("../../../middlewares/validatormiddleware");

const storeValidations = [
  check("name").not().isEmpty().withMessage("Name is required"),

  check("owner").not().isEmpty().withMessage("Owner is required"),

  check("users.*").optional(),

  check("users.userID").not().isEmpty().withMessage("User ID is required"),

  check("users.role")
    .not()
    .isEmpty()
    .withMessage("Role is required")
    .isIn(["User", "Admin"])
    .withMessage("Role must be User or Admin"),
  validatorMiddleware,
];

exports.createStoreValidation = [...storeValidations];

exports.updateStoreValidation = [
  check("storeId").not().isEmpty().withMessage("Store ID is required"),

  ...storeValidations,
  validatorMiddleware,
];
