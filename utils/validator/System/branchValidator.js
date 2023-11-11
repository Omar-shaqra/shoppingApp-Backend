const { check } = require("express-validator");
const validatorMiddleware = require("../../../middlewares/validatormiddleware");

const branchValidation = [

    check("name").not().isEmpty().withMessage("name is required"),

    check("storeId").not().isEmpty().withMessage("storeId is required"),

    check("address").not().isEmpty().withMessage("address is required"),

    check("description").not().isEmpty().withMessage("description is required"),

    validatorMiddleware,
];

module.exports = {
    branchValidation,
  };