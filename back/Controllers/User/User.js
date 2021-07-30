const bcrypt = require('bcryptjs');
const User = require('../../models/User');

const normalizeUserId = async (email) => {
  let users = await User.find(function(res, users) {
    return users;
  });

  if (users.filter(e=> e.userMail === email).length === 0) { //Checking if mail already exist in DB;
    if (users.length > 0) {
      return await Promise.resolve(parseInt(users[users.length -1].userId) + 1);
    } else {
      return 1;
    }
  } else return null;
}

exports.createUser = async (req, res) => {
  console.log('here', req.body);
  if (req.body !== undefined 
    && Object.keys(req.body).length === 3
    && req.body.username !== undefined && req.body.username.length > 3
    && req.body.pwd !== undefined && req.body.pwd.length > 6) {
      
      //Normalize ID
      const normalizedId = await normalizeUserId(req.body.email).then(id => id);
      //Salt
      const hashedPwd = await bcrypt.hash(req.body.pwd, 12);

      if (normalizedId !== null) {
        let userToBe = new User({
          userName : req.body.username.trim(),
          userPassword : hashedPwd,
          userId : normalizedId,
          userMail : req.body.email,
          status : "user",
          userTeam : "",
          userCreatedAt : new Date(),
        });        
  
        userToBe.save((err) => {
          if (err) {
            res.status(400);
            res.json({"msg": "Merci de revérifier vos informations.."});
          } else {
            res.json({"msg": "Votre compte a bien été crée. Maintenant, à vous de jouer !"});
          }
        });
      } else {
        res.json({'error':'userExists'});
      }
  }
}

exports.userLogin = async (req, res) => {
  req.session.isAuth = false;
  console.log(req.sessionID);
  console.log(req.session);
  let user = await User.findOne({userMail : req.body.email}, (err, user) => {
    if (err) return {error: "Aucun compte associé à cette adresse."}
    else return {status : "ok","user" : user}
  });
  if (user) {
    //now salty pwd
    let comparePwd = await bcrypt.compare(req.body.pwd, user.userPassword);
    if (comparePwd) {
      
      res.json({msg: "Connected", user: user, cookie: req.sessionID});
    } else res.json({error:'wrongPwd'});
  } else {
    res.json({error:'noUser'});
  }
}