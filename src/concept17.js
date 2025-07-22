/**
 * Concept 17: Connect MongoDB to Express REST API
 * ------------------------------------------------
 * This example adds MongoDB (via Mongoose) to persist data for your API.
 * 
 * 👉 Core Concepts Covered:
 *   - MongoDB connection using Mongoose
 *   - Defining Mongoose models
 *   - CRUD operations with MongoDB
 * 
 * 💡 Interview Tip:
 *   Know how to design schemas, perform CRUD with Mongoose, and handle connection errors.
 */
 
const express = require('express');
const mongoose = require('mongoose');
const app = express();
 
const MONGO_URI = 'mongodb://localhost:27017/concept'; // adjust as needed
 
// Middleware
app.use(express.json());
 
// 1️⃣ Connect to MongoDB
mongoose.connect(MONGO_URI)
.then(() => console.log('MongoDB connected'))
.catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});
 
// 2️⃣ Define a Mongoose model (User)
const userSchema = new mongoose.Schema({
  name: { type: String, required: true }
});
 
const User = mongoose.model('User', userSchema);
 
// 3️⃣ Routes
 
// Create
app.post('/api/users', async (req, res) => {
  try {
    const user = new User({ name: req.body.name });
    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
 
// Read All
app.get('/api/users', async (req, res) => {
  const users = await User.find();
  res.json(users);
});
 
// Read One
app.get('/api/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
 
// Update
app.put('/api/users/:id', async (req, res) => {
  try {
    const updated = await User.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name },
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ message: 'User not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
 
// Delete
app.delete('/api/users/:id', async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User deleted', user: deleted });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
 
// 404 fallback
app.use((req, res) => {
  res.status(404).send('404 - Route Not Found');
});
 
module.exports = app;
 