const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatRoomSchema = new Schema({
  users: [String],
  loadUsers: [String],
  createdBy: String,
  createdAt: Date,
});

module.exports = mongoose.model('ChatRoom', eventSchema);
