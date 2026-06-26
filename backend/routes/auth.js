const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { verifyToken } = require('../middleware/auth');

// Public routes
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);

// Protected routes
router.get('/me', verifyToken, authController.getMe);
router.get('/check', verifyToken, (req, res) => res.status(200).json({ valid: true }));

module.exports = router;
