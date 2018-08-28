var mongoose   = require("mongoose"); 

var campgroundSchema = new mongoose.Schema({
  name: String, 
  image: String,
  description: String, 
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Comment"
    }
  ]
});
// Defining a model with the defined Schema
module.exports = mongoose.model("Campground", campgroundSchema);