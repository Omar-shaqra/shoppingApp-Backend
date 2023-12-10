const express = require("express");
const { create, getByStoreId, deleteOne } = require("../controllers/mangeProductControllers");
const { manageProductValidation } = require("../utils/validator/manageProductValidator");

const router = express.Router();

router.post('/', manageProductValidation, create);

router.get('/:id', getByStoreId);

router.delete('/:id', deleteOne);

module.exports = router;