const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  name: String,
  description: String,
  toBeCompleted: Date,
  assignedTo: String,
  ownerId: String,
  isRepeatable: Boolean,
  preMade: Boolean,
  isCompleted: Boolean,
  report: String,
});

module.exports = mongoose.model("Event", eventSchema);
