
const isAdminMiddleware = (req, res, next) => {
    if (res.locals.user && res.locals.user.role === 'admin') {
      return next();
    } else {
      req.flash('error_msg','Only admin can access the requested resource');
      res.redirect('/login');
    }
  };
  module.exports = isAdminMiddleware;