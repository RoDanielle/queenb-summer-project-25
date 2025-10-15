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
// Protected routes (all require login) - from this line forward, every route defined below requires a valid token.
// -------------------------
router.use(verifyToken);

// -------------------------
// Routes for all logged-in users
// -------------------------
router.get('/me', getCurrentUser);  // Returns the currently logged-in user’s info (decoded from their JWT)
router.patch('/favorites/:recipeId', toggleFavorite); // Lets the user add or remove a recipe from their favorites list

// -------------------------
// Admin-only routes
// -------------------------
router.get('/', adminOnly, getAllUsers); // list all users (admin only)
router.get('/:id', adminOnly, getSingleUser); // view a single user (admin only)
router.post('/', adminOnly, createUser); // create a new user (admin only)
router.patch('/:id', adminOnly, updateUser); // update a single user (admin only)
router.delete('/:id', adminOnly, deleteUser); // // delete a single user (admin only)

module.exports = router;
