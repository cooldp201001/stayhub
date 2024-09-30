const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser")
const cors = require('cors')
const flash = require('connect-flash');
const session = require('express-session')
const bodyParser = require('body-parser')
const PORT = 1000;

// Defined routers
const homeRouter = require('./routers/homeRouter');
const hotelDetailsRouter = require("./routers/hotelDetailsRouter");
const bookingRouter = require("./routers/bookingRouter");
const myBookingRoutes = require('./routers/myBookingRoutes');
const userRegisterRouter = require('./routers/userRegisterRouter');
const loginRouter = require('./routers/loginRouter');
const logoutRouter = require('./routers/logoutRouter');
const profileRoutes = require('./routers/userProfileRoutes');
const searchHotelsRoutes = require('./routers/searchHotelsRoutes');
const adminRoutes = require('./routers/AdminRoutes/adminRoutes');

//Middlewares
app.set("view engine", "ejs");
app.use(express.static('public'))
app.set("views", path.join(__dirname, "views"));
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())
app.use(bodyParser.json());

// Defined middlewares for user authentication
const userLoginMiddleware = require('./middleware/userLoginMiddleware');
const authenticateUser = require("./middleware/authenticateUser");
const isAdminMiddleware = require('./middleware/isAdminMiddleware');
const userOnlyMiddleware = require('./middleware/userOnlyMiddleware');

// Express session middleware
app.use(session({
  secret: process.env.SESSION_KEY,
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

// Public routes (accessible by anyone)
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);


// checking user status and user type on each routes 
app.use(authenticateUser);
// Admin routes (only accessible by admins)
app.use('/admin', isAdminMiddleware, adminRoutes);

// User routes only (not for admin) ,User can access without login 
app.get("/", (req, res) => {
  res.redirect("/home");
});
app.use('/home', userOnlyMiddleware, homeRouter);
app.use('/hotel-details', userOnlyMiddleware, hotelDetailsRouter);
app.use('/register', userOnlyMiddleware, userRegisterRouter);
app.use('/aboutUs',userOnlyMiddleware, (req, res) => {
  res.render('aboutUsPage');
});

app.use((req, res, next) => {
  res.status(404).json({
    message: "Route not found",
    error: "The requested route does not exist on this server.",
  });
});
// User routes (only accessible by logged-in users)
app.use(userLoginMiddleware);
app.use('/booking', bookingRouter);
app.use('/mybookings', myBookingRoutes);
app.use('/profile', profileRoutes);
app.use('/search-hotels', searchHotelsRoutes);
// Catch undefined or non-existent routes

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});