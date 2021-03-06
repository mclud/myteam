var express = require('express');
var router = express.Router();

var mongoose = require('mongoose'); 
const { createField, getFields } = require('../Controllers/Fields/Fields');
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

// router.use(function(req, res, next) {
//   res.set('Access-Control-Allow-Origin', req.headers.origin);
//   next();
// });

router.get("/api", (req, res) => {
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


router.route('/api/addfield')
  .post(createField);

router.route('/api/getfields')
  .get(getFields);

module.exports = router;

