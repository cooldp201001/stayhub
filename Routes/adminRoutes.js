const express = require('express');
const router = express.Router();
const {isAdminMiddleware} = require('../middleware/authMiddleware');
const { getBookings, getUsers, getHotels } = require('../controllers/adminControllers');

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
    const users = await getUsers();
   res.render('adminPages/users',{ users})
})


module.exports = router;
