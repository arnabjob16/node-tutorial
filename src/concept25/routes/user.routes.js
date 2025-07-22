const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload.middleware');
const auth = require('../middlewares/auth.middleware');

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
 
module.exports = router;