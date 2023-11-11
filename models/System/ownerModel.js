const mongoose = require("mongoose");
const ownerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    NationalID: {
      type: String,
      required: true,
      unique: true,
    },
    profile: {
      photo: String,
      biography: String,
    },

    address: {
      street: String,
      city: String,
      state: String,
      country: String,
      pincode: String,
    },

    phone: String,
  },
  {
    timestamps: true,
  }
);

const Owner = mongoose.model("Owner", ownerSchema);
module.exports = Owner;
