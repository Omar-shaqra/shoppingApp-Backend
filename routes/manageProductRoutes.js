const express = require("express");
const { create, getByStoreId, deleteOne } = require("../controllers/mangeProductControllers");
const router = express.Router();
const { manageProductValidation } = require("../utils/validator/manageProductValidator");


router.post('/', manageProductValidation, create);

router.get('/:id', getByStoreId);

router.delete('/:id', deleteOne);


module.exports = router;
