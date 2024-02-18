const mongoose = require("mongoose");
const axios = require ("axios")

    
mongoose.connect("mongodb+srv://kuldeeppatel23:F1zDRSOkYl3T0BIJ@cluster0.0c2ried.mongodb.net/sample_airbnb")
.then(async ()=>{
  console.log("DB connected sucessfully");

  const hotelInventory = mongoose.connection.collection('hotel_inventory');
   
 const hotelsInfo = await hotelInventory.find({}).limit(2).toArray()
 console.log(hotelsInfo);
})
.catch((err)=>{
  console.log(err);
})

