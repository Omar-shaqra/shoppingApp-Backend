const mongoose = require("mongoose");

const clinicSchema = new mongoose.Schema({
  name: String,
  address: String,
  patients: [
    {
      name: String,
      age: Number,
    },
  ],
});

const clinicModel = mongoose.model("Clinics", clinicSchema);

module.exports = clinicModel;
