const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser")
const cors = require('cors')

//hotels database collection
const HotelsCollection = require("./models/hotelSchema");
const PORT = 1000;

//routes
const hotelDetailsRoutes= require("./Routes/hotelDetailsRoutes");
const bookingRoutes = require("./Routes/bookingRoutes");
const myBookingRoutes = require('./Routes/myBookingRoutes')
const registerRoutes = require('./Routes/registerRoutes')
const loginRoutes = require('./Routes/loginRoutes')
const logoutRoutes = require('./Routes/logoutRoutes')
const profileRoutes = require('./Routes/userProfileRoutes')
//Middlewares
app.set("view engine", "ejs");
app.use(express.static('public'))
app.set("views", path.join(__dirname, "views"));
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())

// Defined middlewares
const  authMiddleware = require('./middleware/authMiddleware');
const authenticateUser = require("./middleware/authenticateUser")



app.get("/", (req, res) => {
  res.redirect("/home");
});
// Home routes

app.get("/home",authenticateUser, async (req, res) => {
  const hotelsInfo = await HotelsCollection.find();
  res.render("homePage", { hotelsInfo:hotelsInfo,
     user: res.locals.user});
  
});

// Register router
app.use('/register',registerRoutes)

// Login router
app.use('/login',loginRoutes)


// Logout router
app.use ('/logout',logoutRoutes)

// WORKING:
// Router for showing specific hotel details
app.use("/hotel-details",authenticateUser, hotelDetailsRoutes);
 
//  Hotel booking router for selected hotel
// middleware to validate user before showing the booking list
app.use("/booking",authenticateUser, bookingRoutes); 

//my booking route
app.use('/mybookings',authenticateUser,myBookingRoutes)

app.use('/profile',authenticateUser, profileRoutes);



app.listen(PORT, () => {
  console.log(`Server started \n http://localhost:${PORT}`);
});
