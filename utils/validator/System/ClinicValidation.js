const { check } = require("express-validator");
const validatorMiddleware = require("../../../middlewares/validatormiddleware");

const validateClinic = [
  check("name").not().isEmpty().withMessage("Name is required"),

  check("address").not().isEmpty().withMessage("Address is required"),

  check("patients.*")
    .isArray({ min: 1 })
    .withMessage("Must have at least 1 patient"),

  check("patients.*.name")
    .not()
    .isEmpty()
    .withMessage("Patient name is required"),

  check("patients.*.age")
    .not()
    .isEmpty()
    .isNumeric()
    .withMessage("Age must be a number"),
  validatorMiddleware,
];

module.exports = { validateClinic };
