const jwt = require('jsonwebtoken');
const newUser = require('../models/newUser'); // Adjust the path to your User model

const showLoginUser = async (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        try {
            const decoded = jwt.verify(token,process.env.SECRET_KEY); // Replace 'your_jwt_secret' with your actual secret
            const foundUser = await newUser.findById(decoded.id).select('-password');
           
            // console.log(foundUser);
            if (foundUser) {
                res.locals.user = foundUser; // Store user data in res.locals
            }
        } catch (err) {
        console.log('Error verifying token:', err);
        } 
    }
    next();
};

module.exports = showLoginUser;
