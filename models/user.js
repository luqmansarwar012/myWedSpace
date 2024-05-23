const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const plm = require("passport-local-mongoose");

const { UserRole } = require("../enums");

const userSchema = new Schema({
  fullname: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/.+\@.+\..+/, "Please fill a valid email address"],
  },
  phone: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  role: {
    type: String,
    enum: [UserRole.CUSTOMER, UserRole.HALL_OWNER],
    required: true,
  },
  password: {
    type: String,
  },
});
userSchema.plugin(plm);
module.exports = mongoose.model("user", userSchema);
