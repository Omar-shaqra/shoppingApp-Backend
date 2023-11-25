const Clinic = require("./../../models/System/clinicModel");

// Get all factories
exports.getAllclinics = async (req, res) => {
  try {
    const clinics = await Clinic.find();
    res.status(200).json({
      status: "success",
      results: clinics.length,
      data: {
        clinics,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

// Get single factory
exports.getclinic = async (req, res) => {
  try {
    const clinic = await Clinic.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: {
        clinic,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

// Create a factory
exports.createclinic = async (req, res) => {
  try {
    const newClinics = await Clinic.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        newClinics,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

// Update a factory
exports.updateclinic = async (req, res) => {
  try {
    const clinic = await Clinic.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      data: {
        clinic,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

// Delete a factory
exports.deleteclinic = async (req, res) => {
  try {
    await Clinic.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.calculatePatientCount = async (req, res) => {
  try {
    const clinic = await Clinic.find();

    let patientCount = 0;

    if (clinic.patients) {
      patientCount = clinic.patients.length;
    }
    res.status(200).json({ patientCount: patientCount });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err,
    });
  }
};
