/**
 * Concept 16: REST API with Express.js (CRUD)
 * --------------------------------------------
 * REST (Representational State Transfer) is an architectural style for designing networked applications.
 * We'll create a basic in-memory CRUD API for managing "users".
 * 
 * 👉 Core Concepts Covered:
 *   - REST methods: GET, POST, PUT, DELETE
 *   - Route structure and RESTful principles
 *   - In-memory data store (no DB for simplicity)
 * 
 * 💡 Interview Tip:
 *   Be prepared to build a REST API on the spot. Know REST verbs and status codes.
 */
 
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());

// Parse JSON request bodies
app.use(express.json());
 
// Dummy in-memory data
let users = [
  { id: 1, name: 'Arnab' },
  { id: 2, name: 'Anya' }
];
 
// GET all users
app.get('/api/users', (req, res) => {
  res.json(users);
});
 
// 🔵 GET user by ID
app.get('/api/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find(u => u.id === userId);
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
});
 
// POST (create) user
app.post('/api/users', (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: 'Name is required' });
 
  const newUser = {
    id: users.length + 1,
    name
  };
  users.push(newUser);
  res.status(201).json(newUser);
});
 
// PUT (update) user by ID
app.put('/api/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const { name } = req.body;
  const user = users.find(u => u.id === userId);
 
  if (!user) return res.status(404).json({ message: 'User not found' });
  if (!name) return res.status(400).json({ message: 'Name is required' });
 
  user.name = name;
  res.json(user);
});
 
// DELETE user by ID
app.delete('/api/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const index = users.findIndex(u => u.id === userId);
  if (index === -1) return res.status(404).json({ message: 'User not found' });
 
  const deleted = users.splice(index, 1);
  res.json({ message: 'User deleted', user: deleted[0] });
});
 
module.exports = app;
 