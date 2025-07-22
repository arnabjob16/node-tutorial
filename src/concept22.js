/**
* server.js
* ----------
* Entry point of the application.
* - Loads environment variables
* - Connects to MongoDB
* - Registers auth and user routes
* - Starts Express server
*/
 
require('dotenv').config(); // Load .env variables
const express = require('express');
const connectDB = require('./concept22/config/db');
 
const app = express();
 
// DB Connection
connectDB();
 
// Middleware
app.use(express.json());
 
// Routes
const authRoutes = require('./concept22/routes/auth.routes');
const userRoutes = require('./concept22/routes/user.routes');
 
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
 
// 404 Handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route Not Found' });
});
 
module.exports = app;