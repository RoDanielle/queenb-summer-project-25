const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
     image: { type: String },
    sections: [
      {
        name: { type: String, required: true },
        ingredients: [
          {
            name: { type: String, required: true },
            quantity: { type: String, required: true }
          }
        ],
        instructions: [{ type: String, required: true }]
      }
    ],

    category: { type: String },
    tags: [{ type: String }],
  },
  { timestamps: true } // optional
);

module.exports = mongoose.model('Recipe', recipeSchema);
