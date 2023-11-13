const mongoose = require("mongoose");

const storehouseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: String,
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    quantitySold: Number,
    openingBalance: Number,
    closingBalance: Number,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Storehouse", storehouseSchema);
