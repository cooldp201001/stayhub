// Error handling middleware
function errorHandler  (err, req, res, next){
    if (err.code === 11000 && err.keyPattern.email) {
      // Duplicate email error
      res.status(409).render('errorPage', { errorCode: 409, errorMessage: 'Email is already registered' });
    } 
  };
  
  module.exports = errorHandler;