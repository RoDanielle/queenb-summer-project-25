const User = require('../models/UserModel');
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken');

/**
 * Register a new regular user
 * Public route
 */
const register = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400);
      throw new Error('Email already in use');
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({ name, email, password: hashedPassword });

    res.status(201).json({
      token: generateToken(user),
      user: { id: user._id, name: user.name, email: user.email, role: 'user' },
    });
  } catch (err) {
    next(err); // Pass error to errorMiddleware
  }
};

/**
 * Login existing user
 * Public route
 */
const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400);
      throw new Error('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400);
      throw new Error('Invalid credentials');
    }

    res.status(200).json({
      token: generateToken(user),
      user: { id: user._id, name: user.name, email: user.email, role: user.isManager ? 'admin' : 'user' },
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Create a new admin user
 * Protected route: admin only
 */
const createAdmin = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400);
      throw new Error('Email already in use');
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({ name, email, password: hashedPassword, isManager: true });

    res.status(201).json({
      token: generateToken(user),
      user: { id: user._id, name: user.name, email: user.email, role: 'admin' },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { register, login, createAdmin };
