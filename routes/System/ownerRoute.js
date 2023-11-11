const router = require("express").Router();
const {
  ownerValidation,
} = require("../../utils/validator/System/ownerValidator");
const {
  createOwner,
  getOwners,
  getOwner,
  updateOwner,
  deleteOne,
  getAllStores,
  getAllProducts,
  getAllBranch
} = require("../../controllers/System/ownerController");

router.route("/").post(ownerValidation, createOwner).get(getOwners);
router
  .route("/:id")
  .get(getOwner)
  .patch(ownerValidation, updateOwner)
  .delete(deleteOne);

router.get("/allStores/:id", getAllStores)
router.get("/store/:id/products", getAllProducts)
router.get("/:id/branchs", getAllBranch)




module.exports = router;


