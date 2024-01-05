const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatormiddleware");

exports.validateOrder = [
  check("user").exists().withMessage("User is required"),

  check("cartItems")
    .exists()
    .isArray()
    .withMessage("Cart items must be an array"),

  check("shippingAddress.details")
    .exists()
    .withMessage("Shipping details are required"),

  check("shippingAddress.phone")
    .exists()
    .withMessage("Phone number is required"),

  check("totalOrderPrice")
    .exists()
    .isFloat({ min: 0 })
    .withMessage("Total price must be a number greater than or equal to 0"),

  validatorMiddleware,
];
