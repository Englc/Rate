var express = require("express");
var router = express.Router(); 
var Campground = require("../models/campground");

// INDEX - list of camps
router.get("/", function(req, res){
  Campground.find({}, function(err, camps){
    if(err){
      console.log(err);
    } else {
      res.render("campgrounds/index", {campgrounds: camps, currentUser: req.user});
    }
  });
});

// CREATE - saving / inserting route
router.post("/", function(req, res){
  var name = req.body.name; 
  var image = req.body.image;
  var descr = req.body.description; 
  
  Campground.create({name: name, image: image, description: descr}, function(err, newCamp){
    if(err){
      console.log(err);
    } else {
      res.redirect("/campgrounds");
    }
  });
});

// NEW - form to create new camps
router.get("/new", function(req, res){
  res.render("campgrounds/new");
});

// SHOW - display one camp detailed
router.get("/:id", function(req, res){
  
  Campground.findById(req.params.id).populate("comments").exec(function(err, foundCamp){
    if(err){
      console.log(err)
    } else {
      res.render("campgrounds/show", {campground: foundCamp});
    }
  });
});

module.exports = router; 