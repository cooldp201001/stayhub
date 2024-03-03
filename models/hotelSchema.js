const mongoose = require('../config/db');

const roomSchema = new mongoose.Schema({
  Description: String,
  Description_fr: String,
  Type: String,
  BaseRate: Number,
  BedOptions: String,
  SleepsCount: Number,
  SmokingAllowed: Boolean,
  Tags: [String],
});

const addressSchema = new mongoose.Schema({
  StreetAddress: String,
  City: String,
  StateProvince: String,
  PostalCode: String,
  Country: String,
});


const hotelSchema = new mongoose.Schema({
  HotelId: String,
  HotelName: String,
  Description: String,
  Description_fr: String,
  Category: String,
  Tags: [String],
  ParkingIncluded: Boolean,
  LastRenovationDate: Date,
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