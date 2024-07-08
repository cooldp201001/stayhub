
const hotelBookingCollection = require('../models/hotelBookingSchema');
const usersCollection = require('../models/registerUsers');
const hotelsCollection = require('../models/hotelSchema');

const getBookings = async () => {
    return await hotelBookingCollection.find();
};

const getUsers = async () => {
    return await usersCollection.find().select('-password');
};

const getHotels = async () => {
    return await hotelsCollection.find();
};

module.exports = { getBookings, getUsers, getHotels };
