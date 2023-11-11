const mongoose = require("mongoose");

const storeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    users: [
      {
        userID: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "User",
        },
        role: {
          type: String,
          required: true,
          default: "User",
        },
      },
    ],
  },

  { timestamps: true }
);

module.exports = mongoose.model("Store", storeSchema);
