/**
 * Concept 14: Serve Static Files in Express.js
 * ---------------------------------------------
 * Express makes it easy to serve static content such as:
 *   - HTML pages
 *   - CSS/JS files
 *   - Images, downloads, etc.
 * 
 * 👉 Core Concepts Covered:
 *   - Using express.static middleware
 *   - Serving from a public folder
 *   - Accessing assets via route paths
 * 
 * 💡 Interview Tip:
 *   Be ready to explain how `express.static()` works and how it differs from dynamic routes.
 */
 
const express = require('express');
const path = require('path');
 
const app = express();
const PORT = 3000;
 
// 1️⃣ Use static middleware to serve files from "public" folder
app.use(express.static(path.join(__dirname, '../public')));
 
// 2️⃣ Optional custom fallback route
app.get('/', (req, res) => {
  res.send('Welcome! Visit /index.html or /style.css to test static files.');
});
 
// 3️⃣ 404 fallback
app.use((req, res) => {
  res.status(404).send('404 - File or route not found.');
});
 
module.exports = app;
 