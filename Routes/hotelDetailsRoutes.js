const express = require("express");
const router = express.Router();
const hotelDetailsController = require('../controllers/hotelDetailsController')

router.get("/:hotelName", hotelDetailsController);

module.exports = router;
