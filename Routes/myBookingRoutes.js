const express = require('express');
const router = express.Router();
const Booking = require('../models/hotelBookingSchema'); // Import your Booking model

// Route to render "My Booking" page
router.get('/', async (req, res) => {
    try {
       
        // Fetch bookings associated with the current user
        const bookings = await Booking.find({}); // Adjust this based on your schema
        
        // Render the "My Booking" page with the bookings data
        res.render('myBookingPage', { bookings });
    } catch (error) {
        console.error('Error fetching user bookings:', error);
        res.status(500).json({ message: 'Failed to fetch user bookings', error });
    }
});

module.exports = router;
