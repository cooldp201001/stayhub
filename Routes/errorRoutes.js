const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    const errorCode = req.query.code || 'Unknown';
    const errorMessage = req.query.message || 'An unknown error occurred';
    res.render('errorPage',{ errorCode, errorMessage });
  });
  
  module.exports = router