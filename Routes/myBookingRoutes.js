const express = require('express');
const router = express.Router();
const Booking = require('../models/hotelBookingSchema'); // Import your Booking model
const showMybookings = require('../controllers/myBookingsControllers')
// Route to render "My Booking" page
router.get('/',showMybookings);

module.exports = router;
