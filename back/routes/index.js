var express = require('express');
var router = express.Router();

var mongoose = require('mongoose'); 
const { createUser, userLogin, tryToken, killSession } = require('../Controllers/User/User');

//DB PARAMS
var options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}
const urlmongo = process.env.DB_URL

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
router.route('/api/join')
  .post(createUser);

router.route('/api/login')
  .post(userLogin);

router.route('/api/cookie')
  .get(tryToken);

router.route('/api/logout')
  .get(killSession);

router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

module.exports = router;

