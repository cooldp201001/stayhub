const express = require('express');
const userManagement = express.Router();

const {getAllusers, addUser,deleteUser} = require('../../controllers/adminContollers/userManagementControllers');

userManagement.get('/',getAllusers)

userManagement.post('/add-user',addUser);

userManagement.post('/delete-user',deleteUser );

module.exports =userManagement