
const userLoginMiddleware =(req,res,next)=>{
   
    if(res.locals.user){
        if(res.locals.user.role == 'admin'){

       req.flash('error_msg', 'Admin cannot access the requested route');
          return  res.redirect('/login');
        }
    }
    next();
}

module.exports = userLoginMiddleware