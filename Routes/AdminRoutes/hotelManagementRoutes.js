const express = require('express');
const hotelManage = express.Router();
const HotelsCollection = require('../../models/hotelSchema')

const {getAllhotels} = require('../../controllers/adminContollers/hotelManagementControllers');

//Get all Hotels
hotelManage.get('/',getAllhotels);

// Show  specific hotel to add room
hotelManage.get('/add-room/:hotelName',async (req, res) => {
    const hotelName = req.params.hotelName;
    try {
      // Fetch hotel information based on the hotelName
      const hotelDetails = await HotelsCollection.findOne({ HotelName: hotelName });
      if (!hotelDetails) {
        return res.status(404).json({ message:"Hotel not found"});
      }
  
      // Render the Addroom page with hotel information
      res.render("adminPages/addRoomPage", {hotelDetails});
    } catch (error) {
      // console.log("Error fetching hotel information:", error.message);
      res.status(500).json({ message: "Error in fetching hotel information" });
    }
  });
// Add hotel Room
hotelManage.post('/add-room/:hotelName', async (req, res) => {
  const hotelName = req.params.hotelName;
  const { description, baseRate, sleepsCount } = req.body;
  try {
    const hotel = await HotelsCollection.findOne({HotelName: hotelName});
    if (!hotel) {
      return res.status(404).send('Hotel not found');
    }

    const newRoom = {
      Description: description,
      BaseRate: baseRate,
      SleepsCount: sleepsCount
    };

    hotel.Rooms.push(newRoom);
    await hotel.save();

    res.redirect(`/admin/hotels/add-room/${hotelName}`);
  } catch (error) {
    console.log(error);
    res.status(500).send('An error occurred');
  }
});



// Add new hotel
// hotelManage.post('/add-hotel');

module.exports = hotelManage;