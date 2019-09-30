var path = require('path'),  
    express = require('express'),  //refers to Express the middleware helper for Node.js 
    mongoose = require('mongoose'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    config = require('./config'),
    listingsRouter = require('../routes/listings.server.routes'), 
    getCoordinates = require('../controllers/coordinates.server.controller.js');

module.exports.init = function() {
  //connect to database
  mongoose.connect(config.db.uri, { useNewUrlParser: true });
    mongoose.set('useCreateIndex', true);
    mongoose.set('useFindAndModify', false);

  //initialize app
  var app = express();

  //enable request logging for development debugging
  app.use(morgan('dev'));

  //body parsing middleware 
  app.use(bodyParser.json());

  /* serve static files - see http://expressjs.com/en/starter/static-files.html */
  app.use('/', express.static(__dirname + '/../../client'));
  //serve the static files found in the public folder when a user makes a request to the path
  app.use('/public', express.static(__dirname + '/../../client'));

/* The next three middleware are important to the API that we are bulding */

 //use listings router for requests to the API
  app.use('/api/listings', listingsRouter);

   /* Request Handler for coordinates
      This is a server wrapper around Open Cage Data Geocoding API to get latitude + longitude coordinates from address */
  app.post('/api/coordinates', getCoordinates, function(req, res) {
    res.send(req.results);
  });

  /* Request Handeler for all other routes
     Sends a response (res) to go to the homepage for all routes not specified */ 
  app.all('/*', function(req, res) {
    res.sendFile(path.resolve('client/index.html'));
  });
  return app;
};  