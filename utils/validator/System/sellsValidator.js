const { check } = require("express-validator");
const validatorMiddleware = require("../../../middlewares/validatormiddleware");

const sellsValidation = [
  check("productId").not().isEmpty().withMessage("Product ID is required"),

  check("quantity")
    .not()
    .isEmpty()
    .withMessage("Quantity is required")
    .isNumeric()
    .withMessage("Quantity must be a number"),

  check("totalPrice")
    .not()
    .isEmpty()
    .withMessage("Total price is required")
    .isNumeric()
    .withMessage("Total price must be a number"),

  check("clientId").not().isEmpty().withMessage("Client ID is required"),

  check("date")
    .not()
    .isEmpty()
    .withMessage("Date is required")
    .isDate()
    .withMessage("Date must be a valid date"),

  check("systemUserId")
    .not()
    .isEmpty()
    .withMessage("System user ID is required"),

  check("billcount")
    .not()
    .isEmpty()
    .withMessage("Bill count is required")
    .isNumeric()
    .withMessage("Bill count must be a number"),

  check("shopId").not().isEmpty().withMessage("Shop ID is required"),

  check("paymentType")
    .not()
    .isEmpty()
    .withMessage("Payment type is required")
    .isIn(["cash", "credit", "debit"])
    .withMessage("Payment type must be cash, credit or debit"),

  validatorMiddleware,
];

module.exports = {
  sellsValidation,
};
