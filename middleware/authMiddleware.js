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
      req.user = decodedToken
      next();
    }
  
    catch(error){
        req.flash('error_msg', 'Please log in to view this resource');
        req.user = null
        res.redirect('/login')
    }


}

module.exports = authMiddleware
