const { check } = require("express-validator");
const validatorMiddleware = require("../../../middlewares/validatormiddleware");

const supplierValidation = [
  check("phone").not().isEmpty().withMessage("phone is required"),

  check("name").not().isEmpty().withMessage("name is required"),

  check("productType").not().isEmpty().withMessage("productType is required"),

  validatorMiddleware,
];

module.exports = {
  supplierValidation,
};
