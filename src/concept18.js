/**
 * Concept 18: Environment Variables using dotenv
 * -----------------------------------------------
 * Environment variables let you:
 *   - Avoid hardcoding sensitive configs (e.g., PORT, DB URI, API keys)
 *   - Separate development, test, and production configs
 * 
 * 👉 Core Concepts Covered:
 *   - Using the `dotenv` package
 *   - Creating a `.env` file
 *   - Accessing values via `process.env`
 * 
 * 💡 Interview Tip:
 *   Always mention `.env` usage when asked about secure configs or deployment prep.
 */
 
require('dotenv').config(); // Load from .env file
 
const express = require('express');
const app = express();
 
// Use environment variables
const PORT = process.env.PORT || 3000;
const MODE = process.env.NODE_ENV || 'development';
 
app.get('/', (req, res) => {
  res.send(`Server running in ${MODE} mode on port ${PORT}`);
});
 
module.exports = app;
 