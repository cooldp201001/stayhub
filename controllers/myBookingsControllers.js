const hotelBookingDatabase = require('../models/hotelBookingSchema')
const showMybookings =async (req, res) => {
    try {
         let userEmail = res.locals.user.email
         console.log(res.locals.user);
        // Fetch bookings associated with the current user
        const myBookings = await hotelBookingDatabase.find({email:userEmail}); // Adjust this based on your schema
        // console.log(myBookings);
        // Render the "My Booking" page with the bookin gs data
        res.render('myBookingPage', { myBookings });
    } catch (error) {
        console.error('Error fetching user bookings:', error);
        res.status(500).json({ message: 'Failed to fetch user bookings', error });
    }
}
module.exports = showMybookings