const express = require('express');
const searchHotels = express.Router();
const HotelsCollection = require('../models/hotelSchema');


searchHotels.get('/',(req,res)=>{
    res.render('searchHotelsPage')
})

//fetching all cities from Database
searchHotels.get('/locations', async (req, res) => {
    try {
      const cities = await HotelsCollection.distinct('Address.City');
      // console.log(cities.length);
      res.json(cities);
    } catch (error) {
      console.error('Error fetching cities:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  // route for fetching the hotels according the requested city
  searchHotels.get('/locations/:city', async(req,res)=>{
    let cityName = req.params.city

    try{
        const hotelsbyCity = await (await HotelsCollection.find({'Address.City':cityName},'HotelName'))
                // console.log(hotelsbyCity)
        res.json(hotelsbyCity);
    }
    catch(error){
        res.status(500).json({error:'Internal error while fatching hotels by city'})
    }
  })

  //Route for sending the all hotels details according to user selected while hotel search
  searchHotels.post('/locations',async(req,res)=>{
    // console.log(req.body);
    let hotelName = req.body.hotel
    const hotelDetails =await HotelsCollection.find({'HotelName':hotelName})
    // console.log(hotelDetails);
    res.status(200).json(hotelDetails)
  })
module.exports = searchHotels;