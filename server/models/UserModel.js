const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
   name: {
      type: String,
      required: "Name is required",
    },
    email: {
      type: String,
      required: "Email is required",
      unique: true,
    },
    password: {
      type: String,
      required: "Password is required",
    },
    isManager: {
      type: Boolean,
      required: true,
      default: false,
    },
    // New fields for password reset functionality
    resetPasswordToken: String,
    resetPasswordExpires: Date,
      // array of Recipe IDs
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Recipe" }]
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('User', userSchema);
