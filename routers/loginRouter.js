const express = require('express')
const loginRouter = express.Router()
const {showLoginPage,loginRequest} = require('../controllers/loginControllers')

loginRouter.get('/',showLoginPage);
loginRouter.post('/',loginRequest);
module.exports= loginRouter