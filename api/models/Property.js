const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const propertySchema = new Schema({
  num: String,
  street: String,
  city: String,
  province: String,
  postalCode: String,
  userIds: [String],
  ownerId: String,
});

module.exports = mongoose.model("Property", propertySchema);
