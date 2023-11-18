const mongoose = require("mongoose");

const sellsSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Product",
  },
  quantity: {
    type: Number,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  systemUserId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  billcount: {
    type: Number,
  },
  unit: {
    type: String,
    enum: ["grams", "kilograms"],
    required: true,
  },
  shopId: {
    type: String,
    required: true,
  },
  paymentType: {
    type: String,
    required: true,
    enum: ["cash", "credit", "debit"],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

sellsSchema.pre("save", async function (next) {
  try {
    if (this.isNew) {
      // Get the maximum existing billcount value
      const maxBillcount = await this.constructor
        .findOne({}, "billcount")
        .sort({ billcount: -1 })
        .limit(1)
        .lean();

      // Increment the billcount by one
      this.billcount = (maxBillcount?.billcount || 0) + 1;
    }
    next();
  } catch (error) {
    next(error);
  }
});

// Create the Sell model
const Sell = mongoose.model("Sell", sellsSchema);

const Sales = mongoose.model("sells", sellsSchema);

module.exports = Sales;
