const express = require("express");
const hotelDetailsRouter = express.Router();
const hotelDetailsController = require('../controllers/hotelDetailsController')

hotelDetailsRouter.get("/:hotelName", hotelDetailsController);

module.exports = hotelDetailsRouter;
