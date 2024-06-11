const mongoose = require('../config/db');

const bookingSchema = new mongoose.Schema({

  fullName: {
    type: String,
    required: true
  },
  mobileNumber: {
    type: String,
    required: true
  },
  email:{
    type:String,
    require:true
  },
  roomType: {
    type: String,
    required: true
  },
  guestCount: {
    type: Number,
    required: true
  },
  checkInDate: {
    type: String,
    required: true
  },
  checkOutDate: {
    type: String,
    required: true
  },
  hotelName:{
    type:String,
    required:true
  },
  location:{
    type:String,
    required:true
  },
  bookingDate: {
    type: Date,
    default: Date.now
  }
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
  