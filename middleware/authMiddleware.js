const jwt = require('jsonwebtoken');

const authMiddleware = (req,res,next)=>{

    const token = req.cookies.jwt; 

    if(!token){
        req.flash('error_msg', 'Please log in to view this resource');
        req.user =null;
       return res.redirect('/login')
    }
    try{
      const decodedToken =   jwt.verify(token,process.env.SECRET_KEY) 
      req.user = decodedToken;
      next();
    }
  
    catch(error){
        req.flash('error_msg', 'Please log in to view this resource');
        req.user = null
        res.redirect('/login')
    }


}

const isAdminMiddleware = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
      return next();
    } else {
      req.flash('error_msg', 'You are not authorized to view this page');
      res.redirect('/');
    }
  };
module.exports = {authMiddleware,isAdminMiddleware};
