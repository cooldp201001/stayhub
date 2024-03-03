const express = require('express')
const path = require('path')
const hotels = require('./models/hotelSchema')
const app = express()
const PORT = 1000;


             
 //routes
 const hotelInfoRoutes = require('./Routes/hotelInfoRoutes')
 const bookingRoutes = require('./Routes/bookingRoutes')
 const bookingInfoRoutes = require('./Routes/bookingInfoRoutes')
//Set EJS as the view engine
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.use(express.urlencoded({extended:true}));
app.use(express.json());
//hotel details router
app.use('/hotel-details',hotelInfoRoutes)

// hotel booking router
app.use('/booking',bookingRoutes)


// hotel booking form submission 
app.use('/bookingdetails',bookingInfoRoutes)

app.get('/',(req,res)=>{
    res.redirect('home')
})
app.get('/home',async (req,res)=>{
    const hotelsInfo= await hotels.find();
        // console.log(await usersCollection)
 res.render('homePage',{hotelsInfo})
})

app.listen(PORT,()=>{
    console.log(`server started \n http://localhost:${PORT}`)
})