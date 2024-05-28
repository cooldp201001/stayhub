const express = require("express");
const router = express.Router();
const {userRegister, showRegisterPage} = require('../controllers/userRegisterControllers')

//Router for rendering Register Page
router.get("/",showRegisterPage);

//Router for Registering the user
router.post("/",userRegister );

module.exports = router;
