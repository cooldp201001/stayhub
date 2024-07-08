const express = require('express');
const router = express.Router();
const newUser = require('../models/registerUsers'); // Adjust the path as needed
// const { checkAuthenticated } = require('../middlewares/authenticateUser'); // Adjust the path as needed

// Get profile page
router.get('/', (req, res) => {
  res.render('profilePage', { user: res.locals.user });
  //  console.log(res.locals);
});

// Update profile
// router.post('/', checkAuthenticated, async (req, res) => {
//   try {
//     const { name, email, age } = req.body;
//     const userId = res.locals.user._id;

//     const updatedUser = await User.findByIdAndUpdate(
//       userId,
//       { name, email, age },
//       { new: true }
//     ).select('-password');

//     res.render('profile', { user: updatedUser, successMessage: 'Profile updated successfully!' });
//   } catch (error) {
//     console.error('Error updating profile:', error);
//     res.render('profile', { user: res.locals.user, errorMessage: 'Error updating profile. Please try again.' });
//   }
// });

module.exports = router;
