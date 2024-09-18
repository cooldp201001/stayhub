const express = require('express');
const adminRouter = express.Router();
const isAdminMiddleware = require('../../middleware/isAdminMiddleware');
const usersCollection = require('../../models/userSchema');
const hotelBookingCollection = require("../../models/hotelSchema");
const hotelsCollection = require('../../models/hotelSchema');

//Admin Sub-routes
const bookingManageRoutes = require('./bookingManageRoutes');
const userManagementRoutes = require('./userManagementRoutes');
const hotelManagementRoutes = require('./hotelManagementRoutes');

//Middleware to check user is admin or not
// adminRouter.use(isAdminMiddleware);

// Admin dashboard route
adminRouter.use('/', async (req, res) => {

    console.log('Calling admin dashboard');
    // const userCount = (await usersCollection.find()).length
    // const bookingCount = (await hotelBookingCollection.find()).length;
    // const hotelCount = (await hotelsCollection.find()).length;
    
    // res.render('adminPages/adminDashboardPage', {
    //     bookingCount,
    //     userCount,
    //     hotelCount
    // });
});

//Manage users by admin
adminRouter.use('/users',userManagementRoutes);

// Manage bookings by admin
adminRouter.use('/bookings',bookingManageRoutes)

// Manage hotels by admin
adminRouter.use('/hotels',hotelManagementRoutes)

module.exports = adminRouter;
