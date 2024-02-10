const mongoose = require('mongoose');

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
});


const Hotel = mongoose.model('Hotel', hotelSchema,'hotel_inventory');

module.exports = Hotel;
