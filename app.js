const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser")
const cors = require('cors')
const flash = require('connect-flash');
const session = require('express-session')
// const bodyParser = require('body-parser')
//hotels database collection
const PORT = 1000;

// Defined routers
const homeRouter = require('./routers/homeRouter');
const hotelDetailsRouter= require("./routers/hotelDetailsRouter");
const bookingRouter = require("./routers/bookingRouter");
const myBookingRoutes = require('./routers/myBookingRoutes');
const userRegisterRouter = require('./routers/userRegisterRouter');
const loginRouter = require('./routers/loginRouter');
const logoutRouter = require('./routers/logoutRouter');
const profileRoutes = require('./routers/userProfileRoutes');
const searchHotelsRoutes  = require('./routers/searchHotelsRoutes');
const adminRoutes  =require('./routers/AdminRoutes/adminRoutes');

//Middlewares
app.set("view engine", "ejs");
app.use(express.static('public'))
app.set("views", path.join(__dirname, "views"));
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())

// Defined middlewares for user authentication
const  authMiddleware= require('./middleware/authMiddleware');
const authenticateUser= require("./middleware/authenticateUser");

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



// User register route
app.use('/register',userRegisterRouter); 

// Login router
app.use('/login',loginRouter); 

// Logout router
app.use ('/logout',logoutRouter);

// checking user status on each routes 
app.use(authenticateUser);

// Home route
app.get("/", (req, res) => {
  res.redirect("/home");
});

// Home route
app.use('/home',homeRouter);

// Route for showing specific hotel details
app.use("/hotel-details", hotelDetailsRouter);

//about us route
app.use('/aboutUs',(req,res)=>{
  res.render('aboutUsPage');
})

//Admin routes
app.use('/admin/dashboard',adminRoutes);  //TODO

//middleware for protected routes cannot access below routes without login
app.use(authMiddleware);

//  Hotel booking route for selected hotel
app.use("/booking", bookingRouter); 

// Route to show user's own bookings
app.use('/mybookings',myBookingRoutes);

// Route for searching hotels
app.use('/search-hotels',searchHotelsRoutes)

// Profile routes
app.use('/profile', profileRoutes);


app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
