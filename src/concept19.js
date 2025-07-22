/**
* server.js
* ----------
* Entry point of the application.
* - Loads environment variables
* - Connects to MongoDB
* - Registers auth and user routes
* - Starts Express server
*/

require('dotenv').config();
const express = require('express');
const connectDB = require('./concept19/config/db');

const app = express();

// DB Connection
connectDB();

// Middleware
app.use(express.json());

// Routes
const userRoutes = require('./concept19/routes/user.routes');
app.use('/api/users', userRoutes);

// 404 & Error
app.use((req, res) => res.status(404).send('Not Found'));

module.exports = app;
