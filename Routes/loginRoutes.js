const express = require('express')
const router = express.Router()
const {showLoginPage,loginRequest} = require('../controllers/loginControllers')

router.get('/',showLoginPage)
router.post('/',loginRequest);
module.exports= router