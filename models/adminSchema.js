const mongoose = require("../config/db");

const adminSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    role:{
        type: String,
        default: "admin"
    }
});

const admin = mongoose.model('admin',adminSchema)

 module.exports = admin; 