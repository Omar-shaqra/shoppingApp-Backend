const { check } = require("express-validator");
const subcategory = require("../../models/subCategorymodel");

const validatemiddleware = require("../../middlewares/validatormiddleware");

exports.createsubcategory = [
  check("name")
    .notEmpty()
    .withMessage("name is required")
    .isLength({ min: 2 })
    .withMessage("too short")
    .isLength({ max: 32 })
    .withMessage("too long")
    .custom((val) => {
      const check = subcategory.find({ name: val });
      if (check) {
        return false;
      }
    })
    .withMessage("Invalid subcategory name<already exist>"),
  check("category").notEmpty().isMongoId().withMessage("invalid mongo id "),
  validatemiddleware,
];

exports.getonesubcategory = [
  check("id")
    .notEmpty()
    .withMessage("id is required")
    .isMongoId()
    .withMessage("invalid mongo id"),

  validatemiddleware,
];

exports.updateonesubcategory = [
  check("id")
    .notEmpty()
    .withMessage("id is required")
    .isMongoId()
    .withMessage("invalid mongo id"),

  validatemiddleware,
];

exports.deleteonesubcategory = [
  check("id")
    .notEmpty()
    .withMessage("id is required")
    .isMongoId()
    .withMessage("invalid mongo id"),

  validatemiddleware,
];
