const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload.middleware');
const auth = require('../middlewares/auth.middleware');

const User = require('../models/user.model');
// Upload single image (e.g., profile pic)
router.post(
  '/upload-profile',
  auth,
  upload.single('profile'),
  (req, res) => {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
 
    res.json({
      message: 'File uploaded successfully',
      filename: req.file.filename,
      path: `/public/uploads/${req.file.filename}`
    });
  }
);


// ✅ GET /api/users?search=&sort=desc&page=1&limit=10
router.get('/', auth, async (req, res) => {
  try {
    const search = req.query.search || '';
    const filter = {
      name: { $regex: search, $options: 'i' } // case-insensitive match
    };

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const sortDirection = req.query.sort === 'asc' ? 1 : -1;
 
    const users = await User.find(filter)
      .sort({ createdAt: sortDirection })
      .skip(skip)
      .limit(limit);
 
    const total = await User.countDocuments(filter);
 
    res.json({
      total,
      page,
      limit,
      users
    });
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
});
 
module.exports = router;
 