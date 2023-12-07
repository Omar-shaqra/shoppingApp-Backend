const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

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
    passwordConfirm: {
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

userSchema.methods.matchPassword = async function (EnteredPassord) {
  return await bcrypt.compare(EnteredPassord, this.password);
};

userSchema.pre("save", async function (next) {
  //run when password modified

  if (!this.isModified("password")) {
    return next();
  }

  //hash password to random word of 12 char's
  this.password = await bcrypt.hash(this.password, await bcrypt.genSalt(12));
  this.paswwordConfirm = undefined;
  next();
});

userSchema.pre("save", async function (next) {
  //run when password modified

  if (!this.isModified("password") || this.isNew) {
    return next();
  }

  userSchema.pre(/^find/, function (next) {
    this.find({ active: { $ne: false } });
    next();
  });

  //hash password to random word of 12 char's
  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.methods.changePasswordAt = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changeTimestamp = this.passwordChangedAt.getTime();
    console.log(changeTimestamp, JWTTimestamp);
    return JWTTimestamp < changeTimestamp;
  }
  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.PasswordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.PasswordResetExpired = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
