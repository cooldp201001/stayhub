const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const {isAdminMiddleware} = require('../middleware/authMiddleware');
const { getBookings, getUsers, getHotels } = require('../controllers/adminControllers');
const usersCollection = require('../models/registerUsers');


//Middleware to check user is admin or not
router.use(isAdminMiddleware);

router.get('/',(req,res)=>{
    res.redirect('admin/dashboard');
})

// Admin dashboard route
router.get('/dashboard', async (req, res) => {
    const bookingCount = (await getBookings()).length ;
    const userCount = (await getUsers()).length;
    const hotelCount = (await getHotels()).length;
    
    res.render('adminPages/adminDashboardPage', {
        bookingCount,
        userCount,
        hotelCount
    });
});

//show all the users in user Page
router.get('/users', async (req,res)=>{

    const users = await usersCollection.find();
   res.render('adminPages/users',{ users})
})


// Add new user
router.post('/users/add', async (req, res) => {
    try {
      const { name, email, password,  } = req.body;
      const hashedPassword = await bcrypt.hash( password, 10 );
      const newUser = new usersCollection({
        name,
        email,
        password: hashedPassword,
      });
      await newUser.save();
      res.redirect('/admin/users');
    } catch (error) {
        console.log(error);
      res.status(500).json({ message:"Error in adding the user:" });
    }
  });

module.exports = router;
