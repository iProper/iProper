const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const propertySchema = new Schema({});

module.exports = mongoose.model("Property", propertySchema);
