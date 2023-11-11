const mongoose = require("mongoose");

const BillSchema = new mongoose.Schema(
  {
    count: {
      type: Number,
      required: true,
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model("Bills", BillSchema);
