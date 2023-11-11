const mongoose = require("mongoose");

const branchSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim:true,
      max:20
    },
    storeId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Store",
    },
    address: {
      type: String,
      required: true,
      max:45,
    },
    description: {
      type: String,
      required: true,
      max:80
    },
  },

  { timestamps: true }
);


const BranchModel = mongoose.model("Branch", branchSchema);

module.exports = BranchModel;
