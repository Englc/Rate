var mongoose = require("mongoose"), 
    Campground = require("./models/campground"), 
    Comment = require("./models/comment"); 

var data = [
  {
    name: "A fancy Campground", 
    image: "https://images.unsplash.com/photo-1476041800959-2f6bb412c8ce?auto=format&fit=crop&w=500&q=80", 
    description: "Camp just anywhere you want, don't even care. Lorem ipsum dolor amet tote bag offal pabst vegan crucifix yuccie cloud bread normcore whatever bespoke fanny pack. Freegan chia venmo, waistcoat synth occupy copper mug disrupt raw denim. Quinoa dreamcatcher irony tofu pok pok meggings mixtape live-edge tilde hell of cardigan knausgaard pour-over hammock fingerstache. Street art heirloom affogato, swag authentic af fam VHS. Tumeric woke celiac distillery, meh air plant post-ironic pok pok.Raw denim bushwick brooklyn lomo, art party fashion axe poutine kitsch. Direct trade squid raclette coloring book, chillwave ennui listicle disrupt sriracha meditation lyft. Kinfolk intelligentsia iPhone, farm-to-table drinking vinegar stumptown cornhole tofu blue bottle air plant four loko chambray tousled butcher vice. Butcher fanny pack tofu adaptogen gochujang hella flexitarian yuccie blue bottle beard, street art wolf cardigan tilde. Shabby chic sriracha synth, chia yr 3 wolf moon freegan hell of ethical snackwave whatever skateboard cred.Tbh vexillologist tote bag, yr roof party austin listicle leggings pickled synth lomo before they sold out palo santo kombucha. Af crucifix fashion axe, tbh helvetica paleo hammock bicycle rights man bun blog. Gochujang lumbersexual chia keytar you probably haven't heard of them kombucha try-hard, salvia narwhal drinking vinegar cred ennui pop-up single-origin coffee. Ethical migas crucifix, food truck bitters swag iPhone hammock vice plaid. Selvage flannel air plant, everyday carry vaporware meggings unicorn echo park green juice thundercats fam. Bitters migas kitsch cardigan, man bun 8-bit pinterest listicle kogi retro venmo. Next level lomo everyday carry whatever poutine."
  },
  {
    name: "Campus Maximus", 
    image: "https://images.unsplash.com/photo-1500274869470-1cf3be073d1c?auto=format&fit=crop&w=500&q=80", 
    description: "You want to cook some Meth? Then your right here!"
  },
  {
    name: "Cletopia", 
    image: "https://images.unsplash.com/photo-1501724326152-7a82bf5eae72?auto=format&fit=crop&w=500&q=80", 
    description: "It's just awesome here. There isn't anything better than Cletopia"
  }
]; 

module.exports = function() {

  Campground.remove({}, function(err){
    
    if (err){
      console.log(err);
    } else {
      console.log("all campgrounds removed"); 
      
      Comment.remove({}, function(err){
        
        
        
        if (err) {
          console.log(err); 
        } else {
          
          console.log("all comments removed");
          data.forEach(function(seed){
        
            Campground.create(seed, function(err, camp){

              if (err) {
                console.log(err); 
              } else {
                console.log("Added campground"); 

                Comment.create({
                  text: "Here is a comment. A hate-comment.", 
                  author: "Homer"
                }, function(err, comment){

                  if (err) {
                    console.log(err); 
                  } else {

                    camp.comments.push(comment._id); 
                    camp.save(function(err, savedCamp){
                      console.log("comment added to camp");
                    }); 
                  }

                })

              }
            });

          });
          
        }
      });
      
    }
  });
  
}