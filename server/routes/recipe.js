const express = require('express');
const { getAllRecipes,
    getSingleRecipe,
    createRecipe,
    deleteRecipe,
    updateRecipe,
 } = require('../controllers/RecipeController')
const router = express.Router()

/**
 * Read Only Permission Routes
 */

// GET all Recipes
router.get('/', getAllRecipes)

// GET a single Recipe
router.get('/:id', getSingleRecipe)

/**
 * Read and Write Permission Routes
 */

// POST (create) a new Recipe
router.post('/', createRecipe)

// DELETE a Recipe by id
router.delete('/:id', deleteRecipe)

// UPDATE a Recipe by id
router.patch('/:id', updateRecipe)

module.exports = router