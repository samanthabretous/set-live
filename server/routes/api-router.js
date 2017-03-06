const router = require('express').Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
const passportJWT = require('passport-jwt');
const Player = require('../models').player;
const Game = require('../models').game;
const secret = require('../config/passport').secretOrKey;
const debug = require('debug')('OH_GOSH');

const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;

// create new player
router.post('/signup', (req, res) => {
  Player.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  })
  .then((player) => {
    if (player) {
      // create a token that has player id infomation hidden about the player
      const token = jwt.sign({ id: player.id }, secret);
      res.json({ success: true, token: `JWT ${token}`, msg: 'Successful created new user.' });
    }
  })
  .catch(() => {
    res.json({ success: false, msg: 'Username or Email already exists.' });
  });
});

// find player in data base and send them back a token
// else let player know they have entered the wrong password
router.post('/login', (req, res) => {
  Player.findOne({
    where: { username: req.body.username },
  })
  .then((player) => {
    if (player) {
      // access the classMethod on player
      const validate = player['$modelOptions'].classMethods.validPassword;
      validate(req.body.password, player.password, player, (err, isMatch) => {
        if (isMatch) {
          // if player is valid send them a token
          const token = jwt.sign({ id: player.id }, secret);
          res.json({ success: true, token: `JWT ${token}` });
        } else {
          res.status(401).json({ success: false, msg: 'Authentication failed. Wrong password.' });
        }
      });
    } else {
      res.send(false);
    }
  });
});

// get all authorization headers to help with debugging
router.get('/secretDebug', (req, res, next) => {
  console.log(req.get('Authorization'));
  next();
  res.json('debugging');
});


const getToken = (headers) => {
  if (headers && headers.authorization) {
    const parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};

// create a 'protected' route
router.get('/playerinfo',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const token = getToken(req.headers);
    if (token) {
      // decode token received from header
      const decoded = jwt.decode(token, secret);

      Player.findById(decoded.id, { include: Game })
      .then((player) => {
        if (!player) {
          res.send({ success: false, msg: 'Authentication failed. Player not found.' });
        } else {
          res.send({ success: true, msg: `Welcome in the member area ${player.username}!`, playerInfo: player });
        }
      });
    }
  });

module.exports = {
  router,
  getToken,
};
