const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  name: String,
  description: String,
  toBeCompleted: Date,
  assignedTo: String,
  ownerId: String,
  isExpired: Boolean,
  isRepeatable: Boolean,
});

module.exports = mongoose.model("Event", eventSchema);
