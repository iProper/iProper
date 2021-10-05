const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const propertySchema = new Schema({
  address1: String,
  address2: String,
  city: String,
  province: String,
  postalCode: String,
  residentIds: [String],
  ownerId: String,
});

module.exports = mongoose.model("Property", propertySchema);
