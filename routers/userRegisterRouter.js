const express = require("express");
const userRegisterRouter = express.Router();
const {userRegister, showRegisterPage} = require('../controllers/userRegisterControllers')

//Route for rendering Register Page
userRegisterRouter.get("/",showRegisterPage);

//Route for Registering the user
userRegisterRouter.post("/",userRegister );

module.exports = userRegisterRouter;
