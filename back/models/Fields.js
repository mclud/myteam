var mongoose = require('mongoose'); 

//Creation Schéma Mongoose
const FIELDS_SCHEMA = mongoose.Schema({
  fieldId : {
    type: Number,
    required: true,
  },
  fieldName : {
    type: String, 
    required: true
  },
  fieldAdr : {
    type: String, 
    required: true
  },
  fieldCoordX : {
    type: Number, 
    required: true
  },
  fieldCoordY: {
    type: Number, 
    required: true
  },
  fieldCreatedAt: {
    type: Date, 
    required: true
  },
  sportsAvailable : {
      type: String,
      required : true,
  }
});

module.exports = mongoose.model('Field', FIELDS_SCHEMA);