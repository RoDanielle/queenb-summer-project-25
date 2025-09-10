const User = require('../models/UserModel');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Get all users (admin only)
const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json({ users });
  } catch (err) {
    next(err);
  }
};

// Get a single user by ID
const getSingleUser = async (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404);
    return next(new Error('No such user'));
  }

  try {
    const user = await User.findById(id);
    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }
    res.status(200).json({ user });
  } catch (err) {
    next(err);
  }
};

// Create a new user (admin only)
const createUser = async (req, res, next) => {
  const { name, email, password, isManager, favorites } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400);
      throw new Error('Email already in use');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ name, email, password: hashedPassword, isManager, favorites });
    res.status(201).json({ user });
  } catch (err) {
    next(err);
  }
};

// Delete a user by ID (admin only)
const deleteUser = async (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404);
    return next(new Error('No such user'));
  }

  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }
    res.status(200).json({ user });
  } catch (err) {
    next(err);
  }
};

// Update a user by ID (admin only)
const updateUser = async (req, res, next) => {
  const { id } = req.params;
  const { name, email, password, isManager, favorites } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404);
    return next(new Error('No such user'));
  }

  try {
    let updateData = { name, email, isManager, favorites };

    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    const user = await User.findByIdAndUpdate(id, updateData, { new: true });
    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }
    res.status(200).json({ user });
  } catch (err) {
    next(err);
  }
};

module.exports = { getAllUsers, getSingleUser, createUser, deleteUser, updateUser };
