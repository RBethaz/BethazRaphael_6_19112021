const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

// Implementation du schema de donnees de l' API
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});
// Pour s'assurer que 2 user n' utilisent pas le meme email
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);