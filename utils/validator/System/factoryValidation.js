const { check } = require("express-validator");
const validatorMiddleware = require("../../../middlewares/validatormiddleware");

const factoryValidation = [
  check("name").notEmpty().withMessage("Name is required"),
  check("factory_type").notEmpty().withMessage("Factory type is required"),
  check("aboutUs").notEmpty().withMessage("aboutUs is required"),

  check("address.street").notEmpty().withMessage("Street is required"),
  check("address.city").notEmpty().withMessage("City is required"),
  check("address.state").notEmpty().withMessage("State is required"),
  check("address.country").notEmpty().withMessage("Country is required"),
  check("address.zipCode").notEmpty().withMessage("Zip Code is required"),

  check("contact.email").notEmpty().withMessage("Email is required"),
  check("contact.email").isEmail().withMessage("Invalid email format"),
  check("contact.phone").notEmpty().withMessage("Phone is required"),

  check("suppliers.*.supplier").notEmpty().withMessage("Supplier is required"),

  check("category.*.category").notEmpty().withMessage("Category is required"),

  check("products.*.product").notEmpty().withMessage("Product is required"),

  check("active").isBoolean().withMessage("Active must be a boolean value"),

  validatorMiddleware,
];

module.exports = {
  factoryValidation,
};
