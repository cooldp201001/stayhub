const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser")
const  authMiddleware = require('./middleware/authMiddleware');
//hotels database collection
const HotelsCollection = require("./models/hotelSchema");
const PORT = 1000;

//routes
const hotelDetailsRoutes= require("./Routes/hotelDetailsRoutes");
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
// 
// Home routes
app.get("/home", async (req, res) => {
  const hotelsInfo = await HotelsCollection.find();
  //renering all hotels in homepage
  res.render("homePage", { hotelsInfo });
});

// Register router
app.use('/register',registerRoutes)

// Login router
app.use('/login',loginRoutes)

// Router for showing specific hotel details
app.use("/hotel-details", hotelDetailsRoutes);
 
//  Hotel booking router for selected hotel
app.use("/booking", bookingRoutes); 


// Router to show booked hotels
// app.use("/bookingdetails", bookingInfoRoutes);

//my booking route
app.use('/mybookings',myBookingRoutes)


app.listen(PORT, () => {
  console.log(`Server started \n http://localhost:${PORT}`);
});
