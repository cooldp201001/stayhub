const express = require('express')
const router = express.Router();
const {bookingController,bookingFormSubmission} = require('../controllers/bookingControllers')
const HotelBookingCollection = require('../models/hotelBookingSchema')
router.get('/:hotelName',bookingController);

router.post('/',bookingFormSubmission)

module.exports =router
