const router = require("express").Router();
const {
  createStoreValidation,
  updateStoreValidation,
} = require("../../utils/validator/System/storeValidator");
const {
  createStore,
  getStores,
  getStore,
  updateStore,
  deleteStore,
} = require("../../controllers/System/storecontroller");

router.route("/").get(getStores).post(createStoreValidation, createStore);
router
  .route("/:id")
  .get(getStore)
  .patch(updateStoreValidation, updateStore)
  .delete(deleteStore);

module.exports = router;
