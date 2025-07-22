/**
 * Concept 12: Route Parameters & Query Strings in Express.js
 * ------------------------------------------------------------
 * Route parameters and query strings are used to:
 *   - Pass data through URLs
 *   - Fetch or filter resources
 * 
 * 👉 Core Concepts Covered:
 *   - Route Parameters (e.g., /user/:id)
 *   - Query Strings (e.g., /search?keyword=book&page=2)
 * 
 * 💡 Interview Tip:
 *   Understand the difference between `req.params` and `req.query`.
 *   Know how RESTful APIs use dynamic URLs for GET/PUT/DELETE.
 */
 
const express = require('express');
const app = express();
 
app.use(express.json());
const PORT = 3000;
 
// 1️⃣ Route Parameters Example: GET /user/:id
app.get('/user/:id', (req, res) => {
  const userId = req.params.id;
  res.send(`User ID requested: ${userId}`);
});
 
// 2️⃣ Route with multiple parameters: /order/:orderId/item/:itemId
app.get('/order/:orderId/item/:itemId', (req, res) => {
  const { orderId, itemId } = req.params;
  res.json({
    message: 'Order Item Info',
    orderId,
    itemId
  });
});
 
// 3️⃣ Query String Example: /search?keyword=node&page=2
app.get('/search', (req, res) => {
  const { keyword, page = 1 } = req.query; // default page = 1
  res.json({
    message: 'Search Results',
    keyword,
    page
  });
});
 
// 4️⃣ Fallback 404 Middleware
app.use((req, res) => {
  res.status(404).send('404 - Route Not Found');
});
 
module.exports = app;
 