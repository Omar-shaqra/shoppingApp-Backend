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
    required: true,
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
    required: true,
    default: Date.now,
  },
});

const Sales = mongoose.model("sells", sellsSchema);

module.exports = Sales;
