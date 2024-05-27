const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser")
const  authMiddleware = require('./middleware/authMiddleware');
//hotels database collection
const HotelsCollection = require("./models/hotelSchema");
const PORT = 1000;

//routes
const hotelInfoRoutes = require("./Routes/hotelInfoRoutes");
const bookingRoutes = require("./Routes/bookingRoutes");
const bookingInfoRoutes = require("./Routes/bookingInfoRoutes");
const myBookingRoutes = require('./Routes/myBookingRoutes')
const registerRoutes = require('./Routes/registerRoutes')
const loginRoutes = require('./Routes/loginRoutes')

//Middlewares
app.set("view engine", "ejs");
app.use(express.static('public'))
app.set("views", path.join(__dirname, "views"));
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.redirect("/home");
});
app.get("/home",authMiddleware, async (req, res) => {

  const hotelsInfo = await HotelsCollection.find();
  //renering all hotels in homepage
  res.render("homePage", { hotelsInfo });
});

//Router for showing specific hotel details
app.use("/hotel-details", hotelInfoRoutes);
 
// hotel booking router
app.use("/booking", bookingRoutes);

// hotel booking form submission
app.use("/bookingdetails", bookingInfoRoutes);

//my booking route
app.use('/mybookings',myBookingRoutes)

// register routes
app.use('/register',registerRoutes)

// login routes
app.use('/login',loginRoutes)

app.use('/login',(req,res)=>{
 res.render('loginPage')
})
//error routes
// app.use('/error',errorRoutes)





app.listen(PORT, () => {
  console.log(`server started \n http://localhost:${PORT}`);
});
