
const express = require('express');
const router = express.Router();
const Hotel = require('../models/hotelSchema'); 
router.get('/:hotelId', async (req, res) => {
    const hotelId = req.params.hotelId;
    // Retrieve hotel information based on the ID and render the booking page

    try {
        
        // Fetch hotel information based on the hotelId
        const hotel = await Hotel.findById(hotelId);
        if (!hotel) {
            return res.status(404).send('Hotel not found');
        }

        // Render the booking page with hotel information
        res.render('hotelDetailsPage',{hotel})
       
    } catch (error) {
        console.error('Error fetching hotel information:', error.message);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;