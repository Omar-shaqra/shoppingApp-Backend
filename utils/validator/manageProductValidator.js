const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatormiddleware");


const manageProductValidation = [

    check("productId").not().isEmpty().withMessage("productId is required"),

    check("shopeId").not().isEmpty().withMessage("shopeId (branchId) is required"),

    check("userId").not().isEmpty().withMessage("userId is required"),

    check("date").not().isEmpty().withMessage("date is required"),

    validatorMiddleware,
];

module.exports = {
    manageProductValidation,
};