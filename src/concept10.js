/**
 * Concept 10: Basic Express.js Server
 * ------------------------------------
 * Express.js is a minimalist Node.js web framework used for:
 *   - Defining API routes
 *   - Using middleware
 *   - Simplifying request/response handling
 * 
 * 👉 Core Concepts Covered:
 *   - Installing and using Express
 *   - Route handling: GET, POST
 *   - Sending JSON and status codes
 * 
 * 💡 Interview Tip:
 *   Be able to explain how Express wraps Node's `http` module and how middleware flows work.
 */
 
// 1️⃣ Import Express (Make sure to install it first: npm install express)
const express = require('express');
 
// 2️⃣ Create Express app
const app = express();
 
// 3️⃣ Middleware to parse JSON bodies
app.use(express.json());
 
// 4️⃣ Define routes
app.get('/', (req, res) => {
  res.send('Welcome to Express.js Home Page');
});
 
app.get('/about', (req, res) => {
  res.send('This is the About Page');
});
 
app.post('/echo', (req, res) => {
  res.json({
    message: '🔁 You sent this data:',
    data: req.body
  });
});

module.exports = app;