const HotelsCollection = require("../models/hotelSchema");

const showhotelInfo = async (req, res) => {
    const hotelName = req.params.hotelName;
    try {
      // Fetch hotel information based on the hotelName
      const hotelDetails = await HotelsCollection.findOne({ HotelName: hotelName });
      if (!hotelDetails) {
        return res.status(404).json({ message:"Hotel not found"});
      }
  
      // Render the booking page with hotel information
      res.render("hotelDetailsPage", {hotelDetails});
    } catch (error) {
      // console.log("Error fetching hotel information:", error.message);
      res.status(500).json({ message: "Error in fetching hotel information" });
    }
  }
  module.exports = showhotelInfo