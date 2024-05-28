const express = require('express')
const router = express.Router()
const {showLoginPage,userLoginRequest} = require('../controllers/userLoginControllers')

router.get('/',showLoginPage)
router.post('/',userLoginRequest);
module.exports= router