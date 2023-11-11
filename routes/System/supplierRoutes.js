const express = require("express");
const router = express.Router();

const {
  addSupplier,
  updateSupplier,
  getSupplier,
  deleteSupplier,
  getAllSuppliers,
} = require("../../controllers/System/supplierControllers");

const {
  supplierValidation,
} = require("../../utils/validator/System/supplierValidator");

router.route("/").get(getAllSuppliers);

router.post("/addSupplier", supplierValidation, addSupplier);

router.put("/:id", supplierValidation, updateSupplier);

router.get("/:id", getSupplier);

router.delete("/:id", deleteSupplier);

module.exports = router;
