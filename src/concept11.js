/**
 * Concept 11: Middleware and Request Logging in Express.js
 * ----------------------------------------------------------
 * Middleware functions are functions that have access to:
 *   - `req` (request)
 *   - `res` (response)
 *   - `next` (to pass control to next handler)
 * 
 * 👉 Core Concepts Covered:
 *   - Custom middleware
 *   - Logging request method, URL, and time
 *   - Understanding middleware flow
 * 
 * 💡 Interview Tip:
 *   Explain how middleware is chained in Express, and how it allows things like logging, validation, authentication, etc.
 */
 
const express = require('express');
const app = express();
 
// Port
const PORT = 3000;
 
// 1️⃣ Global middleware for logging
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.url}`);
  next(); // Important to call next() or request will hang
});
 
// 2️⃣ JSON body parser
app.use(express.json());
 
// 3️⃣ Sample route
app.get('/', (req, res) => {
  res.send('Home - With Logging Middleware');
});
 
app.post('/data', (req, res) => {
  res.json({
    message: 'Received data',
    received: req.body
  });
});
 
// 4️⃣ 404 Handler (middleware for unmatched routes)
app.use((req, res) => {
  res.status(404).send('404 - Not Found');
});
 
module.exports = app;
 