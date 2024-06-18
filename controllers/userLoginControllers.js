const UserDatabase = require('../models/newUser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

//Rendering the user login page
const showLoginPage = (req,res)=>{
//   console.log(req.flash);
    res.render('loginPage')
}

// Handling the user login request
const userLoginRequest =  async (req,res) => {
    try {
        const loginUserInfo = req.body;
        const foundUser = await UserDatabase.findOne({ 'email': loginUserInfo.email });

        if (foundUser) {
            // If user is found, compare passwords
            const passwordMatch = await bcrypt.compare(loginUserInfo.password, foundUser.password);
            if (passwordMatch) {
                // Passwords match, user authenticated
                const token= createToken (foundUser._id)
                res.cookie('jwt',token)
                                                    
                res.status(200).json({ message: "User login successful" });        
            
                // console.log(req.user);
            } else {
                // Passwords don't match, send error response
                res.status(401).json({ error: "Incorrect password" });
            }
        } else {
            // User not register in database
            res.status(404).json({ error: "User not Register" });
        }
    } catch (error) {
        // Error handling
        console.log('Error logging in user:', error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
//Jwt token creation function
const createToken = (id)=>{
     return jwt.sign({id},process.env.SECRET_KEY,{expiresIn: 24 *60* 60 } )
}

module.exports= {showLoginPage, userLoginRequest}