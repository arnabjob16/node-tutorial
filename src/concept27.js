require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const connectDB = require('./concept27/config/db');
const path = require('path'); 
const app = express();
const swaggerUI = require('swagger-ui-express');
const swaggerSpec = require('./concept27/docs/swagger');
// DB Connection
connectDB();
 
//Security Middlewares
app.use(cors({
  origin: ['http://localhost:3000', 'https://yourfrontend.com'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));            // Enable Cross-Origin
app.use(helmet());            // Set secure HTTP headers
app.use(express.json());      // Parse JSON body
 
//Rate Limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,   // 15 minutes
  max: 100,                   // limit each IP to 100 requests per window
  message: 'Too many requests, try again later.',
});
app.use(limiter);
app.use('/public/uploads/', express.static(path.join(__dirname, '../public/uploads')));
// Routes
const authRoutes = require('./concept27/routes/auth.routes');
const userRoutes = require('./concept27/routes/user.routes');
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
// Fallback
app.use((req, res) => {
  res.status(404).json({ message: 'Route Not Found' });
});
 
module.exports = app;