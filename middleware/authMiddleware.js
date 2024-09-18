const JWT = require('jsonwebtoken');

const authMiddleware = (req,res,next)=>{

    const token = req.cookies.JWT; 
    if(!token){
        req.flash('error_msg', 'Please log in to view this resource');
        // req.user =null;
       return res.redirect('/login');
    }
    try{
      const decodedToken =   JWT.verify(token,process.env.SECRET_KEY) 
    //   req.user = decodedToken;
      next();
    }
    catch(error){
        req.flash('error_msg', 'Please log in to view this resource');
        req.user = null
        res.redirect('/login');
    }
}

module.exports = authMiddleware;
