const express = require("express");
const router = express.Router();
const User = require("../models/newUser");
const bcrypt = require('bcrypt');
router.get('/',(req,res)=>{
 res.render('registerPage')
})

router.post("/", async (req, res,next) => {

  try { 
    const newUserinfo = req.body;
       try{
           const newUser =  new User(newUserinfo)
           const savedNewUser = await  newUser.save()

               // Send a JSON response back to the client
    res.json({ message: 'User saved successfully In DB'});

       } catch (err) {
        // Check if the error is a duplicate key error (code 11000) for the email field
        if (err.code === 11000 && err.keyPattern && err.keyPattern.email) {
            // Duplicate email ID found, send response indicating the email ID is already registered
            res.status(400).json({message:"Email ID is already registered"});
        } else {
          
            // Other errors, log the error and send a generic error response
            console.log('Error in registering the user in DB', err);
            res.status(500).send("Error in registering the user");
        }
    }
    // Process the form data, save it to the database, etc.

  } catch (error) {
    console.log('Error processing form data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }





  // const newUserInfo = req.body;
  // console.log("hii from backend",newUserInfo);
  // const {firstName,lastName,password,confirmPassword} = req.body
  // res.json({name:"kuldeep"})
  // try {
  //   let user = new newUser(newUserInfo);
  //   let savedUser = await user.save();
  //   // console.log(savedUser);
  //   res.status(301).redirect('/home');
  // } catch (error) {
  //   if (error.code === 11000 && error.keyPattern.email) {
  //     //Duplicate email id found so sending error
  //     // res.redirect('error');
  //     next(error)
  //   } else {
  //     // Sending error code for other errors
  //     // res.status(501).send( `Error in registering the user in DB with error code:${error.code}`);
  //     next(error)
  //   }
  // }
});

module.exports = router;
