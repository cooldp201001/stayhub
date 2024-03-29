const express = require('express')
const router = express.Router();

const Hotel = require('../models/hotelSchema');

router.get('/:hotelName',async (req,res)=>{
const hotelName = req.params.hotelName;

try{
    const hotel = await Hotel.findOne({"HotelName":hotelName})
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