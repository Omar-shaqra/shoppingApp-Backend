const express = require("express");
const { create } = require("../controllers/mangeProductControllers");
const router = express.Router();
const { manageProductValidation } = require("../utils/validator/manageProductValidator");


router.post('/', manageProductValidation, create);


module.exports = router;
