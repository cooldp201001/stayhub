const mongoose = require('../config/db');

const RoomSchema = new mongoose.Schema({
   
  Description: {
        type: String,
        description:"Room type",
        example: "Queen Room"
      },
      baseRate: {
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
  })