const express = require('express');
const router = express.Router();
const HotelsCollection = require('../models/hotelSchema');

router.get('/:city', async (req, res) => {
  const { city } = req.params;
  console.log(city);
  try {
    const hotels = await HotelsCollection.find({'Address.City':'New York'}).select;
    res.json(hotels);
  } catch (error) {
    console.error('Error fetching hotels:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
module.exports = router;
