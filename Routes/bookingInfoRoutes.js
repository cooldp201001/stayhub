const express = require('express');
const  router = express.Router();
const Booking = require('../models/hotelBookingSchema')

router.post('/', (req,res)=>{
    
    const {fullName,mobileNumber,roomType,guestCount,checkInDate,checkOutDate} = req.body
  
    const newBooking = new Booking({
        fullName,
        mobileNumber,
        roomType,
        guestCount,
        checkInDate,
        checkOutDate
    });

    // Save the new booking to the database
    newBooking.save()
        .then((booking) => {
            console.log('Booking saved successfully:', booking);
            res.status(201).json({ message: 'Booking saved successfully', booking });
        })
        .catch((error) => {
            console.error('Error saving booking:', error);
            res.status(500).json({ message: 'Failed to save booking', error });
        })
    })

module.exports =router