const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, "Please enter your first name"],
    minlength: 5,
    trim: true,
  },
  lastname: {
    type: String,
    trim: true,
  },
  password: {
    type: String,
    select: false,
    minlength: 6,
    required: [true, "Please enter your password"],
  },
  email: {
    type: String,
    required: [true, "email is required"],
    unique: true,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  } else {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  }
});

userSchema.methods.correctPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
