const mongoose = require('../config/db');

// Define the user schema
const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    // unique: true,
    unique: true,
    lowecase:true
  },
  password: {
    type: String,
    required: true,
    minLength:2
  },
  role: {
    type :String,
    default :"user"
  }
});

// Create a model based on the schema
const User = mongoose.model('User', userSchema);

module.exports = User;
