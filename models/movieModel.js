const mongoose = require("mongoose");

const movieSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      minlength: [2, "order location name is too short"],
      maxlength: [32, "order location name is too long"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    location: {
      type: String,
      required: [true, "order location require"],
    },
    order: {
      type: mongoose.Schema.ObjectId,
      ref: "order",
      required: [true, "order location nust be belong to parent order"],
    },
  },
  { timestamps: true }
);

const Moviementsymodel = mongoose.model("Moviements", movieSchema);

module.exports = Moviementsymodel;
