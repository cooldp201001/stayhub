const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const {isAdminMiddleware} = require('../../middleware/authMiddleware');
const usersCollection = require('../../models/userSchema');
const hotelBookingCollection = require("../../models/hotelSchema");
const hotelsCollection = require('../../models/hotelSchema');

//Admin Sub-routes
const bookingManageRoutes = require('./bookingManageRoutes');
const userManagementRoutes = require('./userManagementRoutes');
const hotelManagementRoutes = require('./hotelManagementRoutes');

//Middleware to check user is admin or not
router.use(isAdminMiddleware);


// Admin dashboard route
router.get('/dashboard', async (req, res) => {

    const userCount = (await usersCollection.find()).length
    const bookingCount = (await hotelBookingCollection.find()).length;
    const hotelCount = (await hotelsCollection.find()).length;
    
    res.render('adminPages/adminDashboardPage', {
        bookingCount,
        userCount,
        hotelCount
    });
});

//Mangae users
router.use('/users',userManagementRoutes);

// Manage bookings
router.use('/bookings',bookingManageRoutes)

// Manage Hotels
router.use('/hotels',hotelManagementRoutes)

module.exports = router;
