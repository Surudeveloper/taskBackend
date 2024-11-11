const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, default: 'user' },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Users', userSchema);
