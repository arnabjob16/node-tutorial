const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth.middleware');
 
// Protected route
router.get('/profile', auth, (req, res) => {
  res.json({
    message: 'Access granted to protected route',
    user: req.user
  });
});
 
module.exports = router;
 