const mongoose = require('../config/db');

const roomSchema = new mongoose.Schema({
  Description: {
    type: String,
    description:"Room type",
    example: "Queen Room"
  },
  BaseRate: {
    type: Number,
    description: "Base rate of the room",
    example: 160.99,
  },
  sleepsCount: {
    type: Number,
    description: "Number of people the room can sleep",
    minimum: 1,
    maximum: 6,
    example: 2
  
},
});

const addressSchema = new mongoose.Schema({
  StreetAddress: String,
  City: String,
  Country: String,
});


const hotelSchema = new mongoose.Schema({
  HotelId: String,
  HotelName: String,
  Description: String,
  Category: String, 
  Rating: Number,
  Address: addressSchema,
  Rooms: [roomSchema],
  imagesUrl:{
    image1:String,
    image2:String,
    image3:String,
    image4:String,
    image5:String
  }
});


const hotels = mongoose.model('hotels',hotelSchema);

module.exports = hotels