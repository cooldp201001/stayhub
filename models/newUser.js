const mongoose = require('../config/db');

// Define the user schema
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  confirmPassword: {
    type: String,
    required: true
  },
  // Add more fields as needed
});

// Create a model based on the schema
const User = mongoose.model('User', userSchema);

module.exports = User;
