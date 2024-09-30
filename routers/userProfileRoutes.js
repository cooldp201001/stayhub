const express = require('express');
const router = express.Router();
const newUser = require('../models/userSchema'); // Adjust the path as needed
// const { checkAuthenticated } = require('../middlewares/authenticateUser'); // Adjust the path as needed

// Get profile page
router.get('/', (req, res) => {
  res.render('profilePage', { user: res.locals.user});
  //  console.log(res.locals);
});


module.exports = router;
