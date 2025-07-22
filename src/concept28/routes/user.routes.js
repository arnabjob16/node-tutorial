const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload.middleware');
const auth = require('../middlewares/auth.middleware');

const User = require('../models/user.model');
/**
 * @swagger
 * /api/users/upload-profile:
 *   post:
 *     summary: Upload profile image
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - profile
 *             properties:
 *               profile:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: File uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 filename:
 *                   type: string
 *                 path:
 *                   type: string
 *       400:
 *         description: No file uploaded
 */
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

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get users with search, sort, and pagination
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search by name
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *         description: Sort by creation date
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Items per page
 *     responses:
 *       200:
 *         description: Paginated user list
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total:
 *                   type: integer
 *                 page:
 *                   type: integer
 *                 limit:
 *                   type: integer
 *                 users:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       email:
 *                         type: string
 */
router.get('/', auth, async (req, res) => {
  // ✅ GET /api/users?search=&sort=desc&page=1&limit=10
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
 