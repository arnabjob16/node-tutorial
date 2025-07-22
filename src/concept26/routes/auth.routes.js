const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const authController = require('../controllers/auth.controller');
 
// Signup Route with Validation
router.post('/signup',
    [
      body('name').notEmpty().withMessage('Name is required'),
      body('email').isEmail().withMessage('Valid email required'),
      body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 chars')
    ],
    authController.signup
);
   
// Login Route with Validation
router.post('/login',
    [
        body('email').isEmail().withMessage('Valid email required'),
        body('password').notEmpty().withMessage('Password is required')
    ],
    authController.login
);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password/:token', authController.resetPassword);
 
module.exports = router;