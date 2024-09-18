const express = require('express');
const HotelsCollection = require('../models/hotelSchema');
 const homeRouter = express.Router();
 
 // route for home page 
 homeRouter.get('/', async (req, res) => {
    const hotelsInfo = await HotelsCollection.find();
    // Geting users status from  authenticateuser middleware
    res.render("homePage", { hotelsInfo:hotelsInfo,
       user: res.locals.user});
  })

module.exports = homeRouter