const express = require("express");
const path = require("path");
const hotels = require("./models/hotelSchema");
const app = express();
const PORT = 1000;

//routes
const hotelInfoRoutes = require("./Routes/hotelInfoRoutes");
const bookingRoutes = require("./Routes/bookingRoutes");
const bookingInfoRoutes = require("./Routes/bookingInfoRoutes");
const myBookingRoutes = require('./Routes/myBookingRoutes')
const registerRoutes = require('./Routes/registerRoutes')
const errorRoutes = require('./Routes/errorRoutes');
const errorHandler = require("./middleware/errorHandler");
//Set EJS as the view engine
app.set("view engine", "ejs");
//serve static file
app.use(express.static('public'))
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get("/", (req, res) => {
  res.redirect("/home");
});
app.get("/home", async (req, res) => {
  const hotelsInfo = await hotels.find();
  // console.log(await usersCollection)
//   res.render("homePage", { hotelsInfo });
 res.render("registerPage")
});

//hotel details router
app.use("/hotel-details", hotelInfoRoutes);

// hotel booking router
app.use("/booking", bookingRoutes);

// hotel booking form submission
app.use("/bookingdetails", bookingInfoRoutes);

//my booking route
app.use('/mybookings',myBookingRoutes)

// register routes
app.use('/register',registerRoutes)

// error handler middleware
app.use(errorHandler)

app.use('/login',(req,res)=>{
 res.render('loginPage')
})
//error routes
// app.use('/error',errorRoutes)





app.listen(PORT, () => {
  console.log(`server started \n http://localhost:${PORT}`);
});
