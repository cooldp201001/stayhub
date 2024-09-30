
const express = require('express');
const bookingManage = express.Router();
const hotelBookingCollection = require('../../models/hotelBookingSchema');

// show all the bookings by the users
bookingManage.get('/', async (req,res)=>{
     let bookings = await hotelBookingCollection.find();
    res.render('adminPages/bookingManagementPage',{bookings})
} );

module.exports =bookingManage
