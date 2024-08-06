
const hotelsCollection = require('../../models/hotelSchema');

// show all hotels
const getAllhotels =  async (req,res)=>{
    const hotels =await hotelsCollection.find();
    res.render('adminPages/hotelManagementPage',{hotels});
    // res.send("hello")
}


module.exports= {
   getAllhotels
}