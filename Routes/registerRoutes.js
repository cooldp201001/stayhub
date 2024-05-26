const express = require("express");
const router = express.Router();
const User = require("../models/newUser");
const bcrypt = require("bcrypt");
const JWT = require('jsonwebtoken');
// const cookieParser = require("cookie-parser")
router.get("/", (req, res) => {
  res.render("registerPage");
});

router.post("/", async (req, res, next) => {
  try {
    const newUserinfo = req.body;
    try {
      const newUser = new User(newUserinfo);

      // Generate a salt with 10 rounds
      const salt = await bcrypt.genSalt(10);

      // Hash the password with the generated salt
      const hashedPassword = await bcrypt.hash(newUserinfo.password, salt);

      // Replace the plain password with the hashed password
      newUser.password = hashedPassword;

     const savedUser =  await newUser.save();
        const token =  createJWT(savedUser._id)
      res.cookie("Jwt",token,{httpOnly:true})
    
      // Send a JSON response back to the client
      // res.json({ message: "User saved successfully In DB" });
      res.redirect('/')
    } catch (err) {
      // Check if the error is a duplicate key error (code 11000) for the email field
      if (err.code === 11000 && err.keyPattern && err.keyPattern.email) {
        // Duplicate email ID found, send response indicating the email ID is already registered
        res.status(400).json({ message: "Email ID is already registered" });
      } else {
        // Other errors, log the error and send a generic error response
        console.log("Error in registering the user in DB", err);
        res.status(500).send("Error in registering the user");
      }
    }
    // Process the form data, save it to the database, etc.
  } catch (error) {
    console.log("Error processing form data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const createJWT = (id)=>{
  return JWT.sign({id},process.env.SECRET_KEY,{expiresIn:24 * 60 *60  } )
}

module.exports = router;
