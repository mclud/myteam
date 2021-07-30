var express = require('express');
const { body } = require('express-validator');
var router = express.Router();
var port = 5000; 
var mongoose = require('mongoose'); 
const { createUser, userLogin } = require('../Controllers/User/User');
const session = require('express-session');
const MongoDBSession = require('connect-mongodb-session')(session);

//DB PARAMS
var options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}
var urlmongo = "mongodb+srv://ludo:testwebdb@clusterludo.by2wl.gcp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";


//connection to DB
mongoose.connect(urlmongo, options);
var db = mongoose.connection; 

exports.store = new MongoDBSession({
  mongooseConnection : mongoose.connection,
  collection:  "sessions",
  mongoose_connection : db,
});

//DB CONNECTION HANDLERS
db.on('error', console.error.bind(console, 'échec de la connection.')); 
db.once('open', function (){
    console.log("Connexion réussie."); 
}); 

//inscription
router.route('/join')
  .post(createUser);

router.route('/login')
  .post(userLogin);

router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

module.exports = router;

