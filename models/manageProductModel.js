const mongoose = require("mongoose");

const manageProduct = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.ObjectId,
      ref: "Product",
      required: true,
    },
    storeId:{
        type: mongoose.Schema.ObjectId,
        ref: "Store",
        required: true,
    },
    userId:{
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
    date: {
        type: Date,
        required: true
    }
  },
  { timestamps: true }
);



module.exports = mongoose.model("manageProduct", manageProduct);
