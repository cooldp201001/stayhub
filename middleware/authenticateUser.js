const jwt = require('jsonwebtoken');
const newUser = require('../models/newUser'); // Adjust the path to your User model

const authenticateUser = async (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        try {
            const decoded = jwt.verify(token,process.env.SECRET_KEY); // Replace 'your_jwt_secret' with your actual secret
            const foundUser = await newUser.findById(decoded.id).select('-password');
           
            // console.log(foundUser);
            if (foundUser) {
                res.locals.user = foundUser; // Store user data in res.locals
            }else {
                res.locals.user = null;
              }
            } catch (err) {
              console.error('Error verifying token:', err);
              res.locals.user = null;
            }
          } else {
            res.locals.user = null;
          }
    next();
};

module.exports = authenticateUser;
