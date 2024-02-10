const express = require('express')
const path = require('path')
const connectDB = require('./config/db')
const app = express()
const PORT = 1000;

//connection the db
 let usersCollection = connectDB()
             
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

app.post('/bookingdetails', async (req,res)=>{
    res.send('form submitted sucessfully');
    console.log(req.body)
   })
// hotel booking form submission 
// app.use('/booking/bookingdetails',bookingdetailsRoutes)

app.get('/',(req,res)=>{
    res.redirect('home')
})
app.get('/home',async (req,res)=>{
    const hotelsInfo= await usersCollection;
        // console.log(await usersCollection)
 res.render('homePage',{hotelsInfo})
})

app.listen(PORT,()=>{
    console.log(`server started \n http://localhost:${PORT}`)
})