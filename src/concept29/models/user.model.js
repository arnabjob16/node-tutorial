const mongoose = require('mongoose');
 
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: String,
  resetToken: String,
  resetTokenExpiry: Date
}, {
  timestamps: true
});
 
module.exports = mongoose.model('User', userSchema);