const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  phoneNumber: String,
  propertyCode: String,
  isOwner: Boolean,
});

module.exports = mongoose.model("User", userSchema);
