const router = require('express').Router(),
      jwt = require('jsonwebtoken'),
      passport = require('passport'),
      passportJWT = require("passport-jwt"),
      ExtractJwt = passportJWT.ExtractJwt,
      JwtStrategy = passportJWT.Strategy,
      Player = require('../models').player,
      Game = require('../models').game,
      secret = require('../config/passport').secretOrKey
      debug = require('debug')('OH_GOSH');


//create new player
router.post('/signup', (req,res) =>{
  debug(req.body)
  Player.create({
    username: req.body.username, 
    email: req.body.email,
    password: req.body.password,
  })
  .then(player => {
    debug(player)
    if(player){
      const token = jwt.sign({id:player.id}, secret)
      res.json({success: true, token: 'JWT ' + token, msg: 'Successful created new user.'})
    }    
  })
  .catch(err => {
    debug(err)
    res.json({success: false, msg: 'Username or Email already exists.'})
  })
});

// find player in data base and send them back a token
// else let player know they have entered the wrong password
router.post("/login", (req, res) => {
  Player.findOne({
    where: {username: req.body.username }
  })
  .then(player => {
    if (player) {

      //access the classMethod on player
      const validate = player['$modelOptions'].classMethods.validPassword
      validate(req.body.password, player.password, player, (err,isMatch)=>{
        if(isMatch) {

          //if player is valid send them a token
          const token = jwt.sign({id: player.id}, secret)
          res.json({success: true, token: 'JWT ' + token})
        } else {
          res.status(401).json({success: false, msg: 'Authentication failed. Wrong password.'})
        }
      })
    } else {
      res.send(false)
    }
  })
});

//get all authorization headers to help with debugging

router.get('/secretDebug', (req, res, next) => {
    console.log(req.get('Authorization'));
    next();
    res.json("debugging");
});


const getToken = (headers) => {
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
    debug(req.headers)
    const token = getToken(req.headers);
    if (token) {

      //decode token received from header
      const decoded = jwt.decode(token, secret);

      Player.findById(decoded.id, {include: Game})
      .then(player => {
        if (!player) {
          res.send({success: false, msg: 'Authentication failed. Player not found.'});
        } else {
          res.send({success: true, msg: 'Welcome in the member area ' + player.username + '!', playerInfo: player});
        }
      });
    }
  }
)




module.exports = {
  router, 
  getToken
}