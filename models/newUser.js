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
    // unique: true,
    lowecase:true
  },
  password: {
    type: String,
    required: true,
    minLength:2
  },
});

// Create a model based on the schema
const User = mongoose.model('User', userSchema);

module.exports = User;
