//You can replace this entire file with your Bootcamp Assignment #2 - ListingSchema.js File

/* Import mongoose and define any variables needed to create the schema */
var mongoose = require('mongoose'), 
    Schema = mongoose.Schema;

/* Create your schema */
var listingSchema = new Schema({
    code: {type: String, required: false, unique: true},
    name: {type: String, required: false, unique: false},
    coordinates: {
      latitude: {type: Object, required: false, unique: false},
      longitude: {type: Object, required: false, unique: false}
    },
     address: Object,

  /* your code here from Bootcamp Assignment #2 - ListingSchema.js File*/
    
});

/* create a 'pre' function that adds the updated_at and created_at if not already there property */
listingSchema.pre('save', function(next) {
  var currentDate = new Date();

  //change the updatedAt field to current
  this.updated_at = currentDate;

  //if createdAt doesn't have anything, give it current date
  if (!this.created_at) {
    this.created_at = new Date();
  }
  next();
});

/* Use your schema to instantiate a Mongoose model */
var Listing = mongoose.model('Listing', listingSchema);

/* Export the model to make it avaiable to other parts of your Node application */
module.exports = Listing;
