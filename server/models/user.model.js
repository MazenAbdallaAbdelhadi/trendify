const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const roles = require("../config/roles");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    profileImage: String,
    bio: String,
    password: String,
    passwordChangedAt: Date,
    passwordResetSecret: String,
    passwordResetVerified: Boolean,
    role: {
      type: Number,
      enum: [roles.ADMIN, roles.VENDOR, roles.CUSTOMER],
      default: roles.CUSTOMER,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

userSchema.methods.verifyPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
