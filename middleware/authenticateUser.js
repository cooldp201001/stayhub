const JWT = require('jsonwebtoken');
const usersColllection = require('../models/userSchema');
const adminCollection = require('../models/adminSchema')
const authenticateUser = async (req, res, next) => {
    const token = req.cookies.JWT;
    if (token) {
        try {
            const decoded = JWT.verify(token,process.env.SECRET_KEY); 
            const foundUser = await usersColllection.findById(decoded.id).select('-password');
           
            if (foundUser) {
                res.locals.user = foundUser; // Store user data in res.locals
            }else {
              
              const foundAdmin = await adminCollection.findById(decoded.id).select('-password');
              if(foundAdmin){
                res.locals.user = foundAdmin;
                // return res.redirect('/admin/dashboard');
                console.log('calling from authenticateUser Middleware',res.locals.user);
              }
              else{
                res.locals.user = null;
              }
              }
            } catch (err) {
              console.log('Error verifying token:', err);
              res.locals.user = null;
            }
          } else {
            res.locals.user = null;
          }
    next();
};
module.exports =authenticateUser;
