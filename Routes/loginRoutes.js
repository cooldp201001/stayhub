const express = require('express')
const router = express.Router()
const UserDatabase = require('../models/newUser');
const bcrypt = require('bcrypt');

router.post('/', async (req,res) => {
    console.log( "output from backend",req.body);
    // res.send(JSON.parse())
    // res.json(req.body)
    try {
        const loginUserInfo = req.body;
        const foundUser = await UserDatabase.findOne({ 'email': loginUserInfo.email });

        if (foundUser) {
            // If user is found, compare passwords
            const passwordMatch = await bcrypt.compare(loginUserInfo.password, foundUser.password);
            if (passwordMatch) {
                // Passwords match, user authenticated
                res.status(200).json({ message: "User login successful" });
            } else {
                // Passwords don't match, send error response
                res.status(401).json({ error: "Incorrect password" });
            }
        } else {
            // User not found in database
            res.status(404).json({ error: "User not found" });
        }
    } catch (error) {
        // Error handling
        console.log('Error logging in user:', error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
module.exports= router