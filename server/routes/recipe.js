const express = require('express');
const {
  getAllRecipes,
  getSingleRecipe,
  createRecipe,
  updateRecipe,
  deleteRecipe,
} = require('../controllers/RecipeController');

const verifyToken = require('../middleware/authMiddleware');
const adminOnly = require('../middleware/adminMiddleware');
const upload = require('../middleware/upload');

const router = express.Router();

// PUBLIC: anyone can view recipes
router.get('/', getAllRecipes);
router.get('/:id', getSingleRecipe);

// ALL USERS: all logged in users can create a new recipe
router.post('/', verifyToken, upload.single('image'), createRecipe);

// ADMIN ONLY: creating, updating, deleting recipes
router.patch('/:id', verifyToken, upload.single('image'), updateRecipe);
router.delete('/:id', verifyToken, adminOnly, deleteRecipe);

module.exports = router;
