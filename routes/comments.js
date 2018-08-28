var express = require("express");
var router = express.Router({mergeParams:true}); 
var Campground = require("../models/campground"), 
    Comment    = require("../models/comment");

// NEW
router.get("/new", isLoggedIn, function(req, res){
  Campground.findById(req.params.id, function(err, campground){
    if (err) {
      console.log(err); 
    } else {
      res.render("comments/new", {campground: campground});
    }
  });
});

// CREATE
router.post("/", isLoggedIn, function(req, res){
  Campground.findById(req.params.id, function(err, campground){
    if (err) {
      console.log(err); 
      res.redirect("/campgrounds");
    } else {
      Comment.create(req.body.comment, function(err, createdComment){
        if (err) {
          console.log(err);
        } else {
          // add username and id to comment and save
          createdComment.author.id = req.user._id; 
          createdComment.author.username = req.user.username;
          createdComment.save(); 
          // add comment to campground
          campground.comments.push(createdComment._id); 
          campground.save(); 
          res.redirect("/campgrounds/"+campground._id); 
        }
      });
    }
  });
});

function isLoggedIn(req, res, next){
  if (req.isAuthenticated()){
    return next(); 
  }
  res.redirect("/login");
}

module.exports = router; 