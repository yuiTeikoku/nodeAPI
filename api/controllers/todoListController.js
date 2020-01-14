'use strict';

var crypto = require('crypto');
var mongoose = require('mongoose'),
  Products = mongoose.model('Products'),
  Sessions = mongoose.model('Sessions'),
  Users = mongoose.model('Users'),
  Cart = mongoose.model('Cart');

exports.temp = function (req, res) {
  res.json({"name" : "yourname"});
}

exports.user_by_session = function (req, res) {
  var {session} = req.body;
  Sessions.findById(session, function (err, session) {
    if (!session) {
      res.json({})
    } 
    else {
      Users.findById(session.userId, function(err, user) {
        if (!user) 
          res.json({})
        else 
          res.json(user._id);

      });
    }
  })
}

exports.authenticate = function (req, res) {
  var send_user = new Users(req.body);
  var {login, password} = send_user;
  Users.findOne({login, password}, function(err, user) {    
    if (err)
      res.send(err);

    if (!user) 
      res.send("Wrong password or login");
    else {
      let newSession = new Sessions({
        userId: user._id,
        timeIn: Date.now()
      });
      newSession.save();

      res.json(newSession._id)
    }
  });
}

exports.registration = function (req, res) {
  var send_user = new Users(req.body);
  Users.findOne({login: send_user.login}, function(err, user) {
    if (err)
      res.send(err);

    if (!user) {
      send_user.save( function (err, user) {
        if (err)
          res.send(err);
        
        res.send("User was created.");
      })
    } else 
      res.send("User already exists.");
  });
}

exports.list_all_products = function(req, res) {
  Products.find({}, function(err, Products) {
    if (err)
      res.send(err);
    res.json(Products);
  });
};

exports.read_a_product = function(req, res) {
  Products.findById(req.params.productsId, function(err, products) {
    if (err)
      res.send(err);
    res.json(products);
  });
};

exports.add_to_cart = function(req, res) {
  const cartItem = new Cart(req.body);
  cartItem.save(function(err, cartItem) {
    if (err)
      return console.log(err);

    res.json(cartItem);
  });
};

exports.get_cart_by_userId = function(req, res) {
  Cart.find({userId: req.params.userId}, function (err, cart) {
    if (err)
      return console.log(err);

    res.json(cart);
  });
}

exports.remove_from_cart = function (req, res) {
  const {itemId, userId} = req.body;
  Cart.findById(itemId, function (err, cartItem) {
    if (err)
      return console.log(err);

    if (cartItem.userId === userId)
      cartItem.remove();
    else 
      res.json("You must have permission for delete this item.");
  });
}

// exports.update_a_Products = function(req, res) {
//   Products.findOneAndUpdate({_id:req.params.ProductsId}, req.body, {new: true}, function(err, Products) {
//     if (err)
//       res.send(err);
//     res.json(Products);
//   });
// };
// Products.remove({}).exec(function(){});
// exports.delete_a_Products = function(req, res) {

//   Products.remove({
//     _id: req.params.ProductsId
//   }, function(err, Products) {
//     if (err)
//       res.send(err);
//     res.json({ message: 'Products successfully deleted' });
//   });
// };
