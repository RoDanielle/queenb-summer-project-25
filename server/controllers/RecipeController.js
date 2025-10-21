const Recipe = require('../models/RecipeModel');
const mongoose = require('mongoose');

const getAllRecipes = async (req, res, next) => {
  try {
    const { category, tags, sort } = req.query;
    let filter = {};

    if (category) {
      filter.category = category;
    }

    if (tags) {
      const tagsArray = tags.split(",").map(tag => tag.trim());
      filter.tags = { $all: tagsArray };
    }

    // Default: newest first
    let sortOption = { createdAt: -1 };

    // 🧠 Sorting logic
    if (sort === "oldest") sortOption = { createdAt: 1 };
    else if (sort === "az") sortOption = { title: 1 };
    else if (sort === "za") sortOption = { title: -1 };

    const recipes = await Recipe.find(filter).sort(sortOption);
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

// Create a new recipe 
const createRecipe = async (req, res, next) => {
  try {
    const { title, description, category } = req.body;

    // Parse sections (string -> JSON)
    let sections = [];
    if (req.body.sections) {
      sections = JSON.parse(req.body.sections);
    }

    // Parse tags (string or array)
    let tags = [];
    if (req.body.tags) {
      try {
        tags = JSON.parse(req.body.tags); // if sent as JSON string
      } catch {
        tags = req.body.tags.split(",").map(tag => tag.trim()); // fallback
      }
    }

    // Handle uploaded image
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    const recipe = await Recipe.create({
      title,
      description,
      sections,
      category,
      tags,
      image,
    });

    res.status(201).json({ recipe });
  } catch (err) {
    console.error("Error creating recipe:", err); // ✅ log full error
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
