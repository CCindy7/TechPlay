const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true
    },
    password: String,
    email: {
      type: String,
      match:  [/^\S+@\S+\.\S+$/, 'Please enter a valid email.'], // Validation
      unique: true,
      lowercase: true,
      trim: true,
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
