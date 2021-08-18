var express = require('express');
var router = express.Router();

var mongoose = require('mongoose'); 
const { createUser, userLogin, tryToken, killSession } = require('../Controllers/User/User');

//DB PARAMS
var options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}
const urlmongo = "mongodb+srv://ludo:testwebdb@clusterludo.by2wl.gcp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

//connection to DB
mongoose.connect(urlmongo, options);
var db = mongoose.connection; 

//DB CONNECTION HANDLERS
db.on('error', console.error.bind(console, 'échec de la connection.')); 
db.once('open', function (){
    console.log("Connexion réussie."); 
}); 

router.get("/", (req, res) => {
  res.send({ response: "I am alive" }).status(200);
});

//inscription
router.route('/join')
  .post(createUser);

router.route('/login')
  .post(userLogin);

router.route('/cookie')
  .get(tryToken);

router.route('/logout')
  .get(killSession);

router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

module.exports = router;

