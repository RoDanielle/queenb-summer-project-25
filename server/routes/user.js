const express = require('express');
const {
  getAllUsers,
  getSingleUser,
  createUser,
  deleteUser,
  updateUser,
  getCurrentUser,
  toggleFavorite,
} = require('../controllers/userController');

const verifyToken = require('../middleware/authMiddleware');
const adminOnly = require('../middleware/adminMiddleware');

const router = express.Router();

// -------------------------
// Admin-only routes
// -------------------------
router.use(verifyToken);        // All routes below require login

router.get('/', adminOnly, getAllUsers);          // Get all users (admin only)
router.get('/:id', adminOnly, getSingleUser);     // Get a single user (admin only)
router.post('/', adminOnly, createUser);          // Create a new user (admin only)
router.patch('/:id', adminOnly, updateUser);      // Update user info (admin only)
router.delete('/:id', adminOnly, deleteUser);     // Delete user (admin only)

// -------------------------
// Routes for all logged-in users
// -------------------------
router.get('/me', verifyToken, getCurrentUser);
router.patch('/favorites/:recipeId', verifyToken, toggleFavorite);

module.exports = router;
