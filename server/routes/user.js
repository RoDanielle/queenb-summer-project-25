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

// Protect all routes: only authenticated admins can manage users
router.use(verifyToken);
router.use(adminOnly);

// Read-only routes
router.get('/', getAllUsers);          // Get all users
router.get('/:id', getSingleUser);     // Get a single user

// Read/write routes
router.post('/', createUser);          // Create a new user (admin only)
router.patch('/:id', updateUser);      // Update user info
router.delete('/:id', deleteUser);     // Delete user

// Routes for logged-in users (regular user access)
router.get('/me', verifyToken, getCurrentUser);
router.patch('/favorites/:recipeId', verifyToken, toggleFavorite);

module.exports = router;
