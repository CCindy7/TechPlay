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
      match:  [/^\S+@\S+\.\S+$/, 'Merci de rentrer un email valide'], // Validation
      unique: true,
      lowercase: true,
      trim: true,
    },
  },
  {
    // `createdAt` et `updatedAt`
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;