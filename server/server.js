const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
// routes import
const recipeRoutes = require('./routes/recipe');
const userRoutes = require('./routes/user');

// models import
const Recipe = require('./models/RecipeModel');  
const User = require('./models/UserModel');
// Data import 
const recipeData = require('./data/recipeData'); 
const userData = require('./data/userData');

dotenv.config();

// Constants
const PORT = process.env.PORT || 5000;

// Create Express server
const app = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: process.env.CLIENT_URL}));

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Routes
app.use('/api/recipes', recipeRoutes);
app.use('/api/users', userRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(async () => {
    console.log("Connected to MongoDB");

    // Seed recipes if collection is empty
    const recipeCount = await Recipe.countDocuments();
    if (recipeCount === 0) {
      await Recipe.insertMany(recipeData);
      console.log(`Seeded ${recipeData.length} recipes`);
    }
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      await User.insertMany(userData);
      console.log(`Seeded ${userData.length} users`);
    }

    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });

  })
  .catch(err => console.error("Error connecting to MongoDB:", err));
