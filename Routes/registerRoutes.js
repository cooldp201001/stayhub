const express = require("express");
const router = express.Router();
const newUser = require("../models/newUser");

router.get('/',(req,res)=>{
 res.render('registerPage')
})

router.post("/", async (req, res,next) => {
  const newUserInfo = req.body;
  try {
    let user = new newUser(newUserInfo);
    let savedUser = await user.save();
    // console.log(savedUser);
    res.status(301).redirect('/home');
  } catch (error) {
    if (error.code === 11000 && error.keyPattern.email) {
      //Duplicate email id found so sending error
      // res.redirect('error');
      next(error)
    } else {
      // Sending error code for other errors
      // res.status(501).send( `Error in registering the user in DB with error code:${error.code}`);
      next(error)
    }
  }
});

module.exports = router;
