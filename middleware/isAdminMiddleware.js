const isAdminMiddleware = (req, res, next) => {
  console.log('calling fom admin middleare',req.user);
    if (req.user && req.user.role === 'admin') {
      return next();
    } else {
      req.flash('error_msg', 'You are not authorized to view this page');
      res.redirect('/login');
    }
  };
  module.exports = isAdminMiddleware;