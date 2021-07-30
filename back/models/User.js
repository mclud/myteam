var mongoose = require('mongoose'); 

//Creation Schéma Mongoose
const USER_SCHEMA = mongoose.Schema({
  userId : {
    type: Number,
    required: true,
  },
  userName : {
    type: String, 
    required: true
  },
  userMail : {
    type: String, 
    required: true
  },
  userPassword : {
    type: String, 
    required: true
  },
  userCreatedAt: {
    type: Date, 
    required: true
  },
  userLastUpdateDate: Date,
  status: {
    type:String, 
    required: true
  },
});

module.exports = mongoose.model('User', USER_SCHEMA);