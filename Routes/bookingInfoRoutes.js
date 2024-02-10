const express = require('express');
const  router = express.Router();


router.post('/', (req,res)=>{
 res.send('form submitted sucessfully');
 console.log(req.body)
})


module.exports =router