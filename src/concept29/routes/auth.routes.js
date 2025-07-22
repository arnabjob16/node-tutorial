const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const authController = require('../controllers/auth.controller');
/**
* @swagger
* /api/auth/signup:
*   post:
*     summary: Register a new user
*     tags: [Auth]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             required:
*               - name
*               - email
*               - password
*             properties:
*               name:
*                 type: string
*                 example: Arnab
*               email:
*                 type: string
*                 example: arnab@mail.com
*               password:
*                 type: string
*                 example: mysecret123
*     responses:
*       201:
*         description: User registered
*       400:
*         description: User already exists
*/
router.post('/signup',
    [
      body('name').notEmpty().withMessage('Name is required'),
      body('email').isEmail().withMessage('Valid email required'),
      body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 chars')
    ],
    authController.signup
);

/**
* @swagger
* /api/auth/login:
*   post:
*     summary: Login a new user
*     tags: [Auth]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             required:
*               - email
*               - password
*             properties:
*               email:
*                 type: string
*                 example: arnab@mail.com
*               password:
*                 type: string
*                 example: mysecret123
*     responses:
*       201:
*         description: User Login
*       400:
*         description: User already exists
*/
router.post('/login',
    [
        body('email').isEmail().withMessage('Valid email required'),
        body('password').notEmpty().withMessage('Password is required')
    ],
    authController.login
);

/**
* @swagger
* /api/auth/forgot-password:
*   post:
*     summary: Forget password a new user
*     tags: [Auth]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             required:
*               - email
*             properties:
*               email:
*                 type: string
*                 example: arnab@mail.com
*     responses:
*       201:
*         description: Forgot password Login
*       400:
*         description: Forgot password already exists
*/
router.post('/forgot-password', authController.forgotPassword);
/**
* @swagger
* /api/auth/reset-password/{token}:
*   post:
*     summary: Reset password using token
*     tags: [Auth]
*     parameters:
*       - in: path
*         name: token
*         required: true
*         schema:
*           type: string
*         description: Password reset token
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             required:
*               - password
*             properties:
*               password:
*                 type: string
*                 example: newpassword123
*     responses:
*       200:
*         description: Password reset successful
*       400:
*         description: Invalid or expired token
*/
router.post('/reset-password/:token', authController.resetPassword);
 
module.exports = router;