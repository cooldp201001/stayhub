const hotelBookingDatabase = require('../models/hotelBookingSchema')
const showMybookings =async (req, res) => {
    try {
       
        // Fetch bookings associated with the current user
        const myBookings = await hotelBookingDatabase.find({}); // Adjust this based on your schema
        
        // Render the "My Booking" page with the bookings data
        res.render('myBookingPage', { myBookings });
    } catch (error) {
        console.error('Error fetching user bookings:', error);
        res.status(500).json({ message: 'Failed to fetch user bookings', error });
    }
}
module.exports = showMybookings