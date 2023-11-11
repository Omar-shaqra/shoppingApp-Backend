const router = require("express").Router();
const {
  updateBillValidation,
} = require("../../utils/validator/System/billvalidator");
const {
  getBills,
  getBill,
  updateBill,
  deleteBill,
} = require("../../controllers/System/billcontroller");

router.route("/").get(getBills);
router
  .route("/:id")
  .get(getBill)
  .patch(updateBillValidation, updateBill)
  .delete(deleteBill);

module.exports = router;
