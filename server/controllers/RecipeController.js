const Recipe = require('../models/RecipeModel');
const mongoose = require('mongoose')

// get all Recipes
const getAllRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.find();
        res.status(200).json({recipes});
    } catch (err) {
        res.status(400).json({mssg: 'error getting recipes', err})
    }
}

// get a single Recipe
const getSingleRecipe = async (req, res) => {
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such recipe'})
    }

    try {
        const recipe = await Recipe.findById(id);
        res.status(200).json({recipe});
    } catch (err) {
        res.status(400).json({mssg: 'error getting recipe', err})
    }
}

// post (create) a new Recipe
const createRecipe = async (req, res) => {
    const {title, description, sections, category, tags} = req.body;

    try {
        const recipe = await Recipe.create({title, description, sections, category, tags});
        res.status(200).json({recipe});
    } catch (err) {
        res.status(400).json({mssg: 'error creating recipe', err})
    }
}

// delete a Recipe by id
const deleteRecipe = async (req, res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such recipe'})
    }
    
    try {
        const recipe = await Recipe.findByIdAndDelete(id);
        res.status(200).json({recipe});
    } catch (err) {
        res.status(400).json({mssg: 'error deleting recipe', err})
    }
}

// update a Recipe by id
const updateRecipe = async (req, res) => {
    const {id} = req.params;
    const {title, description, sections, category, tags} = req.body;

    try {
        const recipe = await Recipe.findByIdAndUpdate(id, {title, description, sections, category, tags}, {new: true});
        res.status(200).json({recipe});
    } catch (err) {
        res.status(400).json({mssg: 'error updating recipe', err})
    }
}


module.exports = {
    getAllRecipes,
    getSingleRecipe,
    createRecipe,
    deleteRecipe,
    updateRecipe,
}