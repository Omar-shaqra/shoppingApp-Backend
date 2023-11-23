const router = require("express").Router();

const {
  createFactory,
  updateFactory,
  getFactory,
  deleteFactory,
  getAllFactories,
} = require("../../controllers/System/factoryController");

const {
  factoryValidation,
} = require("../../utils/validator/System/factoryValidation");

router.route("/").get(getAllFactories);

router.post("/", factoryValidation, createFactory);

router.put("/:id", factoryValidation, updateFactory);

router.get("/:id", getFactory);

router.delete("/:id", deleteFactory);

module.exports = router;
