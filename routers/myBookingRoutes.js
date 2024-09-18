const express = require('express');
const router = express.Router();
const showMybookings = require('../controllers/myBookingsControllers')
// Route to render "My Booking" page
router.get('/',showMybookings);
module.exports = router;


