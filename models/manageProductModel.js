const mongoose = require("mongoose");

const manageProduct = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.ObjectId,
      ref: "Product",
      required: true,
    },
    shopeId:{
        type: mongoose.Schema.ObjectId,
        ref: "Branch",
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
