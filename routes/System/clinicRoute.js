const router = require("express").Router();

const {
  calculatePatientCount,
  createclinic,
  getAllclinics,
  getclinic,
  updateclinic,
  deleteclinic,
} = require("../../controllers/System/clinicController");

const {
  validateClinic,
} = require("../../utils/validator/System/ClinicValidation");

router.route("/").get(getAllclinics);

router.post("/", createclinic);

router.put("/:id", validateClinic, updateclinic);

router.get("/:id", getclinic);

router.delete("/:id", deleteclinic);

router.get("/patientcount", calculatePatientCount);

module.exports = router;
