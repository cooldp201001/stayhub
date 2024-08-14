const jwt = require('jsonwebtoken');
const usersColllection = require('../models/userSchema');
const adminCollection = require('../models/adminSchema')
const authenticateUser = async (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        try {
            const decoded = jwt.verify(token,process.env.SECRET_KEY); 
            const foundUser = await usersColllection.findById(decoded.id).select('-password');
           
            // console.log(foundUser);
            if (foundUser) {
                res.locals.user = foundUser; // Store user data in res.locals
            }else {
                 
              const foundAdmin = await adminCollection.findById(decoded.id).select('-password');
              if(foundAdmin){
                return res.redirect('/admin/dashboard');
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
