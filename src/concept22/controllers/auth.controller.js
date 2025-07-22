const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const JWT_SECRET = process.env.JWT_SECRET || 'mysecret';
 
exports.signup = async (req, res) => {
  const { name, email, password } = req.body;
  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ message: 'User already exists' });
 
  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashed });
  res.status(201).json({ id: user._id, email: user.email });
};
 
exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: 'User not found' });
 
  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ message: 'Wrong password' });
 
  const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
};
 
// 🔐 Step 1: Forgot Password
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: 'No user with that email' });
 
  const token = crypto.randomBytes(32).toString('hex');
  const expiry = Date.now() + 15 * 60 * 1000; // 15 min
 
  user.resetToken = token;
  user.resetTokenExpiry = expiry;
  await user.save();
 
  // In production: send email
  res.json({
    message: 'Password reset link generated',
    resetLink: `http://localhost:3000/reset-password/${token}`
  });
};
 
// 🔐 Step 2: Reset Password
exports.resetPassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;
 
  const user = await User.findOne({
    resetToken: token,
    resetTokenExpiry: { $gt: Date.now() }
  });
 
  if (!user) return res.status(400).json({ message: 'Invalid or expired token' });
  const hashed = await bcrypt.hash(newPassword, 10);
  user.password = hashed;
  user.resetToken = undefined;
  user.resetTokenExpiry = undefined;
 
  await user.save();
  res.json({ message: 'Password reset successful' });
};
 