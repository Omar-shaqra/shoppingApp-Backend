const { check } = require("express-validator");
const validatorMiddleware = require("../../../middlewares/validatormiddleware");

const storehouseValidation = [
  check("name").not().isEmpty().withMessage("Name is required"),

  check("address").optional(),

  check("products").optional(),

  check("quantitySold")
    .optional()
    .isNumeric()
    .withMessage("Quantity sold must be a number"),

  check("openingBalance")
    .optional()
    .isNumeric()
    .withMessage("Opening balance must be a number"),

  check("closingBalance")
    .optional()
    .isNumeric()
    .withMessage("Closing balance must be a number"),
  validatorMiddleware,
];

exports.createStorehouseValidation = [...storehouseValidation];

exports.updateStorehouseValidation = [
  //check id
  check("storehouseId")
    .not()
    .isEmpty()
    .withMessage("Storehouse ID is required"),

  //other validations
  ...storehouseValidation,
  validatorMiddleware,
];
