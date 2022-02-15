const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: [true, 'Merci de compléter tous les champs.']
    },
    password: {
      type: String,
      match:[/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/, 'Votre mot de passe doit contenir au moins 8 charactères, un nombre, une minuscule et une majuscule.'],
      required:[true, 'Merci de compléter tous les champs.']
    },
      email: {
      type: String,
      match:  [/^\S+@\S+\.\S+$/, 'Merci de rentrer un email valide'], // Validation
      unique: true,
      lowercase: true,
      trim: true,
      required:[true, 'Merci de compléter tous les champs.']
    },
  },
  {
    // `createdAt` et `updatedAt`
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;