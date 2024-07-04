const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser")
const cors = require('cors')
const flash = require('connect-flash');
const session = require('express-session')
//hotels database collection
const HotelsCollection = require("./models/hotelSchema");
const PORT = 1000;

//routes
const hotelDetailsRoutes= require("./Routes/hotelDetailsRoutes");
const bookingRoutes = require("./Routes/bookingRoutes");
const myBookingRoutes = require('./Routes/myBookingRoutes');
const registerRoutes = require('./Routes/registerRoutes');
const loginRoutes = require('./Routes/loginRoutes');
const logoutRoutes = require('./Routes/logoutRoutes');
const profileRoutes = require('./Routes/userProfileRoutes');
const searchHotelsRoutes  = require('./Routes/searchHotelsRoutes');

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

// Express session middleware
app.use(session({
  secret: 'yourSecretKey',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true if using HTTPS
}));

// Connect flash middleware
app.use(flash());

// Set up locals to make flash messages accessible in your views
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  next();
});

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

// Logout routerb
app.use ('/logout',logoutRoutes)

// Router for showing specific hotel details
app.use("/hotel-details",authenticateUser, hotelDetailsRoutes);

//  Hotel booking router for selected hotel
app.use("/booking",authenticateUser, bookingRoutes); 

//middleware for protected routes
app.use(authMiddleware);

//my booking route
app.use('/mybookings',authenticateUser,myBookingRoutes);

app.use('/profile',authenticateUser, profileRoutes);

//about us route
app.use('/aboutUs',authenticateUser,(req,res)=>{
  res.render('aboutUsPage');
})

// Search hotel
app.use('/search-hotels',authenticateUser,searchHotelsRoutes);

// app.use('/locations',locationsRoutes)
// app.use('/hotels',hotelsByCity)

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
