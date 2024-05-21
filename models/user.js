const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const plm = require("passport-local-mongoose");
const userSchema = new Schema({
  username: { type: String, unique: true },
  email: { type: String, unique: true },
  fullname: { type: String, required: true },
});

userSchema.plugin(plm);
module.exports = mongoose.model("User", userSchema);
