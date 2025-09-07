const User = require('../models/UserModel');
const mongoose = require('mongoose')

// get all Users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({users});
    } catch (err) {
        res.status(400).json({mssg: 'error getting users', err})
    }
}

// get a single User
const getSingleUser = async (req, res) => {
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such User'})
    }

    try {
        const user = await User.findById(id);
        res.status(200).json({user});
    } catch (err) {
        res.status(400).json({mssg: 'error getting user', err})
    }
}

// post (create) a new User
const createUser = async (req, res) => {
    const {name, email, password, isManager, favorites} = req.body;

    try {
        const user = await User.create({name, email, password, isManager, favorites});
        res.status(200).json({user});
    } catch (err) {
        res.status(400).json({mssg: 'error creating user', err})
    }
}

// delete a User by id
const deleteUser = async (req, res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such user'})
    }
    
    try {
        const user = await User.findByIdAndDelete(id);
        res.status(200).json({user});
    } catch (err) {
        res.status(400).json({mssg: 'error deleting user', err})
    }
}

// update a User by id
const updateUser = async (req, res) => {
    const {id} = req.params;
    const {name, email, password, isManager, favorites} = req.body;

    try {
        const user = await User.findByIdAndUpdate(id, {name, email, password, isManager, favorites}, {new: true});
        res.status(200).json({user});
    } catch (err) {
        res.status(400).json({mssg: 'error updating user', err})
    }
}


module.exports = {
    getAllUsers,
    getSingleUser,
    createUser,
    deleteUser,
    updateUser,
}