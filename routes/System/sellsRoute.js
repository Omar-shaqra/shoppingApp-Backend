const router = require("express").Router();
const {
  createSell,
  getSells,
  getSell,
  updateSell,
  deleteSell,
} = require("../../controllers/System/sellsController");
const {
  sellsValidation,
} = require("../../utils/validator/System/sellsValidator");

router.route("/").get(getSells).post(sellsValidation, createSell);
router
  .route("/:id")
  .get(getSell)
  .patch(sellsValidation, updateSell)
  .delete(deleteSell);

module.exports = router;
