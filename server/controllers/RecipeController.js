const Recipe = require('../models/RecipeModel');
const mongoose = require('mongoose');

// Get all recipes (any authenticated user)
const getAllRecipes = async (req, res, next) => {
  try {
    const recipes = await Recipe.find();
    res.status(200).json({ recipes });
  } catch (err) {
    next(err);
  }
};

// Get a single recipe by ID
const getSingleRecipe = async (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404);
    return next(new Error('No such recipe'));
  }

  try {
    const recipe = await Recipe.findById(id);
    if (!recipe) {
      res.status(404);
      throw new Error('Recipe not found');
    }
    res.status(200).json({ recipe });
  } catch (err) {
    next(err);
  }
};

// Create a new recipe (admin only)
const createRecipe = async (req, res, next) => {
  const { title, description, sections, category, tags } = req.body;

  try {
    const recipe = await Recipe.create({ title, description, sections, category, tags });
    res.status(201).json({ recipe });
  } catch (err) {
    next(err);
  }
};

// Update a recipe by ID (admin only)
const updateRecipe = async (req, res, next) => {
  const { id } = req.params;
  const { title, description, sections, category, tags } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404);
    return next(new Error('No such recipe'));
  }

  try {
    const recipe = await Recipe.findByIdAndUpdate(
      id,
      { title, description, sections, category, tags },
      { new: true }
    );
    if (!recipe) {
      res.status(404);
      throw new Error('Recipe not found');
    }
    res.status(200).json({ recipe });
  } catch (err) {
    next(err);
  }
};

// Delete a recipe by ID (admin only)
const deleteRecipe = async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404);
    return next(new Error('No such recipe'));
  }

  try {
    const recipe = await Recipe.findByIdAndDelete(id);
    if (!recipe) {
      res.status(404);
      throw new Error('Recipe not found');
    }
    res.status(200).json({ recipe });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllRecipes,
  getSingleRecipe,
  createRecipe,
  updateRecipe,
  deleteRecipe,
};
