/**
 * Concept 13: Error Handling Middleware in Express.js
 * -----------------------------------------------------
 * Express allows you to define a **global error handler** using middleware
 * with the signature: (err, req, res, next).
 * 
 * 👉 Core Concepts Covered:
 *   - Throwing errors manually
 *   - Catching async errors
 *   - Defining centralized error handlers
 * 
 * 💡 Interview Tip:
 *   Always explain how error middleware is placed AFTER all routes,
 *   and how to handle errors thrown in async functions using try/catch or `next(err)`.
 */
 
const express = require('express');
const app = express();
const PORT = 3000;
 
app.use(express.json());
 
// 1️⃣ Normal Route - Works fine
app.get('/', (req, res) => {
  res.send('Home - No error here.');
});
 
// 2️⃣ Route that throws a synchronous error
app.get('/sync-error', (req, res) => {
  throw new Error('This is a synchronous error');
});
 
// 3️⃣ Route with asynchronous error
app.get('/async-error', async (req, res, next) => {
  try {
    // Simulate async failure
    await Promise.reject(new Error('Async operation failed'));
  } catch (err) {
    next(err); // Pass error to the error middleware
  }
});
 
// 4️⃣ Custom error-throwing route
app.post('/validate', (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    // Custom error with status
    const err = new Error('Name is required');
    err.status = 400;
    return next(err);
  }
  res.send(`✅ Received name: ${name}`);
});
 
// 5️⃣ Global Error Handler (must have 4 parameters)
app.use((err, req, res, next) => {
  console.error('Error caught by middleware:', err.message);
 
  res.status(err.status || 500).json({
    error: true,
    message: err.message || 'Internal Server Error'
  });
});
 
// 6️⃣ 404 Handler (always last)
app.use((req, res) => {
  res.status(404).send('404 - Route Not Found');
});
 
module.exports = app;
 