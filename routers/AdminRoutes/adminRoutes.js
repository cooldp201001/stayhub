const express = require('express');
const adminRouter = express.Router();
const usersCollection = require('../../models/userSchema');
const hotelBookingCollection = require("../../models/hotelBookingSchema");
const hotelsCollection = require('../../models/hotelSchema');

//Admin Sub-routes
const bookingManageRoutes = require('./bookingManageRoutes');
const userManagementRoutes = require('./userManagementRoutes');
const hotelManagementRoutes = require('./hotelManagementRoutes');

// Admin dashboard route
adminRouter.get('/', (req, res) => {
    res.redirect('/admin/dashboard');
})

adminRouter.use('/dashboard', async (req, res) => {

    const userCount = (await usersCollection.find()).length
    const bookingCount = (await hotelBookingCollection.find()).length;
    const hotelCount = (await hotelsCollection.find()).length;

    res.render('adminPages/adminDashboardPage', {
        bookingCount,
        userCount,
        hotelCount
    });
});

//Manage users by admin
adminRouter.use('/users', userManagementRoutes);

// Manage bookings by admin
adminRouter.use('/bookings', bookingManageRoutes)

// Manage hotels by admin
adminRouter.use('/hotels', hotelManagementRoutes)
// Catch undefined or non-existent routes
adminRouter.use((req, res, next) => {
    res.status(404).json({
      message: "Route not found",
      error: "The requested route does not exist on this server.",
    });
  });
  
module.exports = adminRouter;
