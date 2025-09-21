const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const bcrypt = require("bcryptjs");

// Routes import
const recipeRoutes = require('./routes/recipe');
const userRoutes = require('./routes/user');
const authRoutes = require('./routes/auth');

// Middleware import
const errorMiddleware = require('./middleware/errorMiddleware');

// Models import
const Recipe = require('./models/RecipeModel');
const User = require('./models/UserModel');

// Seed data import
const recipeData = require('./data/recipeData');
const userData = require('./data/userData');

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: process.env.CLIENT_URL }));

// Logging
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Routes
app.use('/api/auth', authRoutes);      // Register, login, create-admin
app.use('/api/users', userRoutes);     // Admin-only user management
app.use('/api/recipes', recipeRoutes); // Recipe CRUD
app.use("/uploads", express.static("uploads"));


// Catch-all route for unknown endpoints
app.use((req, res, next) => {
  res.status(404);
  const error = new Error(`Not Found - ${req.originalUrl}`);
  next(error);
});

// Global error handler
app.use(errorMiddleware);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('Connected to MongoDB');

    // Seed recipes if collection is empty
    const recipeCount = await Recipe.countDocuments();
    if (recipeCount === 0) {
      await Recipe.insertMany(recipeData);
      console.log(`Seeded ${recipeData.length} recipes`);
    }

    // Seed users if collection is empty
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      // Hash passwords for each user
      const usersWithHashedPasswords = await Promise.all(
        userData.map(async (user) => {
          const hashedPassword = await bcrypt.hash(user.password, 10);
          return { ...user, password: hashedPassword };
        })
      );

      await User.insertMany(usersWithHashedPasswords);
      console.log(`Seeded ${userData.length} users`);
    }

    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch(err => console.error('Error connecting to MongoDB:', err));
