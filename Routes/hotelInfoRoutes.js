const express = require("express");
const router = express.Router();
const hotelInfoController = require('../controllers/hotelInfoController')

router.get("/:hotelName", hotelInfoController);

module.exports = router;
