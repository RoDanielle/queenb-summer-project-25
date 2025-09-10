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

const router = express.Router();

// PUBLIC: anyone can view recipes
router.get('/', getAllRecipes);
router.get('/:id', getSingleRecipe);

// ADMIN ONLY: creating, updating, deleting recipes
router.post('/', verifyToken, adminOnly, createRecipe);
router.patch('/:id', verifyToken, adminOnly, updateRecipe);
router.delete('/:id', verifyToken, adminOnly, deleteRecipe);

module.exports = router;
