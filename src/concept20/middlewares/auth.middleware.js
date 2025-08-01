const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'my_secret_key';
 
module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
 
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
 
  const token = authHeader.split(' ')[1];
 
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next(); // continue to route
  } catch (err) {
    return res.status(403).json({ message: 'Invalid token' });
  }
};