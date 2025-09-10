const express = require('express');
const { register, login, createAdmin } = require('../controllers/authController');
const verifyToken = require('../middleware/authMiddleware');
const adminOnly = require('../middleware/adminMiddleware');

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);

// Admin-only route to create new admin
router.post('/create-admin', verifyToken, adminOnly, createAdmin);

module.exports = router;
