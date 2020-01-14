var express = require('express'),
  app = express(),
  port = process.env.PORT || 8000,
  mongoose = require('mongoose'),
  Products = require('./api/models/ProductsSchema'),
  Users = require('./api/models/UsersSchema'),
  Sessions = require('./api/models/SessionsSchema'),
  Cart = require('./api/models/CartSchema'),
  bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://root:toor123@ds119018.mlab.com:19018/tempuru');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "localhost"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./api/routes/todoListRoutes');
routes(app);

app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});

app.listen(port);

console.log('todo list RESTful API server started on: ' + port);
