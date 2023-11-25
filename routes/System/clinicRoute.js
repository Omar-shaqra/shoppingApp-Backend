const router = require("express").Router();

const {
  calculatePatientCount,
  createclinic,
  getAllclinics,
  getclinic,
  updateclinic,
  deleteclinic,
  addPatient,
} = require("../../controllers/System/clinicController");

const {
  validateClinic,
} = require("../../utils/validator/System/ClinicValidation");

router.route("/").get(getAllclinics);

router.post("/", createclinic);

router.put("/:id", updateclinic);

router.get("/:id", getclinic);

router.delete("/:id", deleteclinic);

router.post("/addPatient/:id", addPatient);

router.get("/patientcount/:id", calculatePatientCount);

module.exports = router;
