const jwt = require('jsonwebtoken');

const requireAuth = (req,res,next)=>{

    const token = req.cookies.jwt;

    if(token){

  jwt.verify(token,process.env.SECRET_KEY,(err,decodedToken)=>{
            
        // req.user = decodedToken;
        // console.log(req.user);
            if(err){
                req.user =null
                res.redirect('/login')
            }
            else{
                next()
            }
        })
    }
    else{
        // req.user = null
        res.redirect('/login')
    }
}

module.exports = requireAuth
// / Middleware to check JWT token
// const checkAuth = (req, res, next) => {
//   const token = req.cookies.jwt;
//   if (!token) {
//     req.user = null;
//     return next();
//   }
//   try {
//     const decoded = jwt.verify(token, SECRET_KEY);
//     req.user = decoded;
//     next();
//   } catch (error) {
//     req.user = null;
//     next();
//   }
// };