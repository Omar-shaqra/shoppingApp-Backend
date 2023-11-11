const router = require("express").Router();
const {
  createStorehouseValidation,
  updateStorehouseValidation,
} = require("../../utils/validator/System/storehouseValidator");

const {
  createStorehouse,
  getStorehouses,
  getStorehouse,
  updateStorehouse,
  deleteStorehouse,
} = require("../../controllers/System/storehouseController");

router
  .route("/")
  .get(getStorehouses)
  .post(createStorehouseValidation, createStorehouse);
router
  .route("/:id")
  .get(getStorehouse)
  .patch(updateStorehouseValidation, updateStorehouse)
  .delete(deleteStorehouse);

module.exports = router;
