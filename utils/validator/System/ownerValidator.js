const { check } = require("express-validator");

exports.ownerValidation = [
  check("name").notEmpty(),

  check("NationalID")
    .notEmpty()
    .custom((value) => {
      if (!/^\d{14}$/.test(value)) {
        throw new Error("Invalid National ID format");
      }

      return true;
    }),

  check("phone").isMobilePhone().withMessage("Invalid phone number"),

  check("address.street").notEmpty(),

  check("address.city").notEmpty(),
];
