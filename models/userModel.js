const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "name require"],
    },
    slug: { type: String, lowercase: true },
    email: {
      type: String,
      unique: true,
      required: [true, "email require"],
      lowercase: true,
    },
    phone: String,

    password: {
      type: String,
      required: [true, "password required"],
      minlength: [6, "password too short"],
    },
    passwordChangedAt: Date,
    passwordRestCode: String,
    passwordRestExp: Date,
    passwordResetVerify: Boolean,
    role: {
      type: String,
      enum: ["user", "admin", "manager"],
      default: "user",
    },
  },
  { timestamps: true }
);

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
