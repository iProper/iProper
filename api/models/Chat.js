const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatSchema = new Schema({
  message: String,
  user: String,
  createdAt: Date,
  chatRoomId: String,
});

module.exports = mongoose.model('Chat', chatSchema);
