const { check } = require("express-validator");
const validatorMiddleware = require("../../../middlewares/validatormiddleware");

const billValidation = [
  check("count")
    .not()
    .isEmpty()
    .withMessage("Count is required")
    .isNumeric()
    .withMessage("Count must be a number"),
  validatorMiddleware,
];

// Validation for update bill
exports.updateBillValidation = [
  // Check if bill exists
  check("billId").not().isEmpty().withMessage("Bill ID is required"),

  // Rest same as create
  ...billValidation,
];
