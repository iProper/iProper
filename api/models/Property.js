const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const propertySchema = new Schema({
  propertyCode: String,
  address1: String,
  address2: String,
  city: String,
  province: String,
  postalCode: String,
  numOfRooms: Number,
  rentalAmount: Number,
  description: String,
  note: String,
  rules: [String],
  residentIds: [String],
  eventIds: [String],
  ownerId: String,
});

module.exports = mongoose.model('Property', propertySchema);
