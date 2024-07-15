
const usersDatabase = require("../models/registerUsers");
const bcrypt = require("bcrypt");
const JWT = require('jsonwebtoken');

const showRegisterPage = (req, res) => {
    res.render("registerPage");
  }

  
  const userRegister = async (req, res) => {
      try {
        const newUser = new usersDatabase(req.body);

        // Generate a salt with 10 rounds
        const salt = await bcrypt.genSalt(10);
        // Hash the password with the generated salt
        const hashedPassword = await bcrypt.hash(newUser.password, salt);
        // Replace the plain password with the hashed password
        newUser.password = hashedPassword;

  // saving user in database
       const savedUser =  await newUser.save();
          const token =  createJWT(savedUser._id)
        res.cookie("Jwt",token,{httpOnly:true})
      
        // After successfull register routing to the home page
        res.redirect('/')

      } catch (err) {
        // Check if the error is a duplicate key error (code 11000) for the email field
        if (err.code === 11000 && err.keyPattern && err.keyPattern.email) {
          // Duplicate email ID found, send response indicating the email ID is already registered
          res.status(400).json({ message: "Email ID is already registered" });
        } else {
          // Other errors, log the error and send a generic error response
        //   console.log("Error in registering the user in DB", err);
          res.status(500).send("Error in registering the user");
        }
      }
  }

//JWT token creation function
  const createJWT = (id)=>{
    return JWT.sign({id},process.env.SECRET_KEY,{expiresIn:24 * 60 *60  } )
  }

  module.exports = {showRegisterPage,userRegister}