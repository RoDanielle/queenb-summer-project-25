const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const rubberDucksRoutes = require('./routes/rubberDucks')
const RubberDuck = require('./models/RubberDuckModel'); // your model



dotenv.config();

// Constants
const PORT = process.env.PORT || 5000;

// Create Express server
const app = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: process.env.CLIENT_URL }));

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Routes
app.use('/api/rubberDucks', rubberDucksRoutes);

// Example ducks to seed
const initialDucks = [
  { name: 'Yellow Ducky', color: 'Yellow', imageUrl: 'https://example.com/yellow.png' },
  { name: 'Green Ducky', color: 'Green', imageUrl: 'https://example.com/green.png' },
  { name: 'Blue Ducky', color: 'Blue', imageUrl: 'https://example.com/blue.png' }
];

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(async () => {

    console.log('Connected to MongoDB');

    // Seed database only if collection is empty
    const count = await RubberDuck.countDocuments();
    if (count === 0) {
      await RubberDuck.insertMany(initialDucks);
      console.log('Database seeded with initial ducks!');
    }

    // Start server
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });

  })
  .catch(err => console.log(err));
