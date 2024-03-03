const express = require("express");
const router = express.Router();
const Hotel = require("../models/hotelSchema");

router.get("/:hotelName", async (req, res) => {
  const hotelName = req.params.hotelName;

  try {
    // Fetch hotel information based on the hotelId
    const hotel = await Hotel.findOne({ HotelName: hotelName });
    if (!hotel) {
      console.log(hotel);
      return res.status(404).send("Hotel not found");
    }

    // Render the booking page with hotel information
    res.render("hotelDetailsPage",{hotel});
  } catch (error){
    console.error("Error fetching hotel information:", error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
