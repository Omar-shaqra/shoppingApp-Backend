const express = require("express");
const { create, getByStoreId } = require("../controllers/mangeProductControllers");
const router = express.Router();
const { manageProductValidation } = require("../utils/validator/manageProductValidator");


router.post('/', manageProductValidation, create);

router.get('/:id', getByStoreId)

module.exports = router;
