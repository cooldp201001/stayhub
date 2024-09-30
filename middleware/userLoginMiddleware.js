const JWT = require('jsonwebtoken');

const userLoginMiddleware = (req, res, next) => {

    const token = req.cookies.JWT;

    if (token) {

        if (res.locals.user.role == 'user') {
            try {
                const decodedToken = JWT.verify(token, process.env.SECRET_KEY)
                next();
            }
            catch (error) {
                req.flash('error_msg', 'Please log in to view this resource');
                //   req.user = null
                res.redirect('/login');
            }
        }
        else {
            req.flash('error_msg', 'Admin cannot access the requested route');
            return res.redirect('/login');
        }

    }
    else {
        req.flash('error_msg', 'please log in to view this resource');
        // req.user =null;
        return res.redirect('/login');
    }

}

module.exports = userLoginMiddleware;
