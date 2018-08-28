var express    = require("express"),
    app        = express(), 
    bodyParser = require("body-parser"),
    mongoose   = require("mongoose"),
    passport   = require("passport"), 
    LocalStrategy = require("passport-local"),
    User       = require("./models/user"),
    seedDB     = require("./seeds");

var campgroundRoutes = require("./routes/campgrounds"), 
    commentRoutes    = require("./routes/comments"), 
    indexRoutes      = require("./routes/index");

mongoose.connect("mongodb://localhost/rate_app");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public")); // define the public directory to for all files delivered to the client
app.set("view engine", "ejs"); // define ejs as default file ending

// seedDB();  seed the database

// Passport configuration
app.use(require("express-session")({
  secret: "this is a very nice app to rate a campground", 
  resave: false, 
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// pass the user to every route, call a middleware for every route with use
app.use(function(req, res, next){
  res.locals.currentUser = req.user; 
  next(); 
});

app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes)

app.listen(3000, function(){
  console.log("started at port 3000");
  console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>");
  console.log("https://mean-eclemensce600504.codeanyapp.com");
  console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>");
});