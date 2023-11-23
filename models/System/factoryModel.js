const mongoose = require("mongoose");

const factorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    street: String,
    city: String,
    state: String,
    country: String,
    zipCode: String,
  },
  contact: {
    email: String,
    phone: String,
  },
  suppliers: [
    {
      supplier: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Supplier",
      },
    },
  ],

  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    },
  ],
  active: {
    type: Boolean,
    default: true,
  },
});

const factoryModel = mongoose.model("Factory", factorySchema);

module.exports = factoryModel;
