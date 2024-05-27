const hotelBookingDatabase = require('../models/hotelBookingSchema')
const hotelDatabase = require('../models/hotelSchema')

const bookingController = async (req,res)=>{
    const hotelName = req.params.hotelName;
    try{
        const hotel = await hotelDatabase.findOne({"HotelName":hotelName})
        if(!hotel){
            return res.status(404).json({message:'Hotel not found'});
        }
        res.render('BookingPage',{hotel})
    }
    catch (error){
        console.error('Error fetching hotel information',error.message);
        res.status(500).send('Internal server Error');
    }
    }

    
const bookingFormSubmission =  async (req,res)=>{
    try{
        const bookingHotelDetails = new hotelBookingDatabase (req.body);

          const savedBookingHotelDetails = await bookingHotelDetails.save()
          console.log(savedBookingHotelDetails);
          res.status(200).send("booking sucessfull")
    }
    catch(error){
        res.status(201).json({message:"Error in booking"})
        // console.log(error);
    }
    }
    module.exports = {bookingController,bookingFormSubmission};