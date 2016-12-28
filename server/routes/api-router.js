const router = require('express').Router(),
      jwt = require('jwt-simple'),
      passport = require('passport'),
      Player = require('../models').player,
      secret = require('../config/secret').secret,
      debug = require('debug')('OH_GOSH');

const createNewPlayer = (req,res) =>{
  Player.create({
    username: req.body.username, 
    email: req.body.email,
    password: req.body.password,
  })
  .then(player => {
    if(player){
      const token = jwt.encode(player, secret)
      res.json({success: true, token: 'JWT ' + token, msg: 'Successful created new user.'})
    }    
  })
  .catch(err => {
    res.json({success: false, msg: 'Username or Email already exists.'})
  })
}

const authenticatePlayer = (req, res) => {
  Player.findOne({
    where: {username: req.body.username }
  })
  .then(player => {
    if (player) {

      //access the classMethod on player
      const validate = player['$modelOptions'].classMethods.validPassword
      validate(req.body.password, player.password,(err,isMatch)=>{
        if(isMatch) {

          //if user is valid send them a token
          const token = jwt.encode(player, secret)
          res.json({success: true, token: 'JWT ' + token})
        } else {
          res.json({success: false, msg: 'Authentication failed. Wrong password.'})
        }
      }, player)
    } else {
      res.send(false)
    }
  })
}

getToken = function (headers) {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};

//create a 'protected' route
router.get('/playerinfo', 
  passport.authenticate('jwt', { session: false}), 
  function(req, res){
    res.send(req.user.profile);
    const token = getToken(req.headers);
    if (token) {
      const decoded = jwt.decode(token, config.secret);
      Player.findOne({
        username: decoded.username
      })
      .then(player => {
        if (!player) {
          return res.status(403).send({success: false, msg: 'Authentication failed. Player not found.'});
        } else {
          res.json({success: true, msg: 'Welcome in the member area ' + player.username + '!'});
        }
      });
    }
  }
)

//api/login
router.route('/authenticate')
  .post(authenticatePlayer)

router.route('/signup')
  .post(createNewPlayer)


module.exports = {
  router
}