const express = require('express');
const router = express.Router();
const {isAdminMiddleware} = require('../middleware/authMiddleware');
const { getBookings, getUsers, getHotels } = require('../controllers/adminControllers');


router.get('/', isAdminMiddleware, async (req, res) => {
    const bookings = await getBookings();
    const users = await getUsers();
    const hotels = await getHotels();
    
    res.render('adminDashboardPage', {
        bookings,
        users,
        hotels
    });
});

module.exports = router;
