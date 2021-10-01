const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const propertySchema = new Schema({
  name: String,
  num: String,
  street: String,
  city: String,
  province: String,
  postalCode: String,
  ownerId: String,
});

module.exports = mongoose.model("Property", propertySchema);
