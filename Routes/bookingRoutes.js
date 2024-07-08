const express = require('express')
const router = express.Router();
const {bookingController,bookingFormSubmission} = require('../controllers/bookingControllers')
const {authMiddleware}= require('../middleware/authMiddleware')


router.get('/:hotelName',bookingController);

// Adding middlleware to authenticate the user for login the website before booking the hotel 
router.post('/',authMiddleware,bookingFormSubmission)

module.exports =router
