const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth.middleware');
router.get('/profile', auth, (req, res) => {
  res.json({
    message: 'This is a protected route',
    user: req.user
  });
});
module.exports = router;