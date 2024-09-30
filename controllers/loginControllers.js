const UserDatabase = require('../models/userSchema');
const adminDatabase  = require('../models/adminSchema')
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken')

//Rendering the user login page
const showLoginPage = (req,res)=>{
    res.render('loginPage');
}

// Handling the user login request
const loginRequest =  async (req,res) => {

    try {
        const loginUserInfo = req.body;
        const foundUser = await UserDatabase.findOne({ 'email': loginUserInfo.email });

        if (foundUser) {
            // If user is found, compare passwords
            const passwordMatch = await bcrypt.compare(loginUserInfo.password, foundUser.password);
            if (passwordMatch) {
                // Passwords match, user authenticated
                const token= createToken (foundUser._id, foundUser.role)
                res.cookie('JWT',token,{httpOnly:true});
                                                    
                res.status(200).json({ message: "User login successful" });        
            
            } else {
                // Passwords don't match, send error response
                res.status(401).json({ error: "Incorrect password" });
            }
        } 
        else {
          //check login user is admin or not
       const foundAdminUser = await adminDatabase.findOne({email:loginUserInfo.email});
       if(foundAdminUser){
         const passwordMatched = await bcrypt.compare(loginUserInfo.password,foundAdminUser.password);
         
         if(passwordMatched){
            //Passwords match, admin authenticated
            const token = createToken(foundAdminUser._id,foundAdminUser.role);
            res.cookie('JWT',token);
            res.status(200).json({message:"admin login successfull"})
            // res.redirect('/admin');

         }
         else{
            res.status(401).json({error:"Incorrect password"})
         }

       }
           
       else{
        // User not register in database
            res.status(404).json({ error: "User not Register" });
       }
        }

    } catch (error) {
        // Error handling
        console.log('Error logging in user:', error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
//JWT token creation function
const createToken = (id,role)=>{
     return JWT.sign({id,role},process.env.SECRET_KEY,{expiresIn: 24 *60* 60 } )
}

module.exports= {showLoginPage,loginRequest}