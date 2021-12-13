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
  description: String,
  note: String,
  rules: [String],
  issues: [String],
  residentIds: [String],
  eventIds: [String],
  chatRoomIds: [String],
  ownerId: String,
});

module.exports = mongoose.model('Property', propertySchema);
