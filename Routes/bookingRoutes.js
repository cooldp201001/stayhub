const express = require('express')
const router = express.Router();

const Hotel = require('../models/hotelSchema');

router.get('/:hotelId',async (req,res)=>{
const hotelId = req.params.hotelId;

try{
    const hotel = await Hotel.findById(hotelId)
    if(!hotel){
        return res.status(404).send('Hotel not found');
    }
    res.render('BookingPage',{hotel})
}
catch (error){
    console.error('Error fetching hotel information',error.message);
    res.status(500).send('Internal server Error');
}
});

module.exports = router