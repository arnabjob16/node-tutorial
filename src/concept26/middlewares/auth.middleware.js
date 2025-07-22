/**
 * Auth Middleware: Verifies JWT token from Authorization header
 */
 
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'mysecret';
 
module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
 
  // Check header format
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' });
  }
 
  const token = authHeader.split(' ')[1];
 
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // store user info in request
    next(); // proceed to next middleware or route
  } catch (err) {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};
 