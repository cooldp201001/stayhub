const usersCollection = require("../models/userSchema");
const bcrypt = require("bcrypt");
const JWT = require('jsonwebtoken');

// Route for rendering register page
const showRegisterPage = (req, res) => {
    res.render("registerPage");
  }

  //Function for posting the user register form
  const userRegister = async (req, res) => {
    
      try {
        console.log(req.body);
        // throw new Error('Error in registering the user in DB');
        const newUser = new usersCollection(req.body);
        
        // Generate a salt with 10 rounds
        const salt = await bcrypt.genSalt(10);
        // Hash the password with the generated salt
        const hashedPassword = await bcrypt.hash(newUser.password, salt);
        // Replace the plain password with the hashed password
        newUser.password = hashedPassword;
        
  // saving user in database
  const savedUser =  await newUser.save();
  const token =  createToken(savedUser._id,savedUser.role)
  res.cookie("JWT",token,{httpOnly:true})
  
  res.status(200).json({message:"User register sucessfully"});
  // After successfull register routing to the home page
  // res.redirect('/');
  
} catch (err) {
        console.log(err);
        // Check if the error is a duplicate key error (code 11000) for the email field
        if (err.code === 11000 && err.keyPattern && err.keyPattern.email) {
          // Duplicate email ID found, send response indicating the email ID is already registered
          res.status(400).json({ message: "Email ID is already registered" });
        } else {
          // Other errors, log the error and send a generic error response
        //   console.log("Error in registering the user in DB", err);

          res.status(500).json({Error:err});
        }
      }
  }

//JWT token creation function
  const createToken = (id,role)=>{
    return JWT.sign({id,role},process.env.SECRET_KEY,{expiresIn:24 * 60 *60  } )
  }

  module.exports = {showRegisterPage,userRegister}