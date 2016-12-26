const passport = require('passport'),
      JwtStrategy = require('passport-jwt').Strategy,
      ExtractJwt = require('passport-jwt').ExtractJwt,
      secret = require('./secret')
      db = require('../models'),
      Player = require('../models').player,
      debug = require('debug')('PASSPORT')



// For Authentication Purposes
module.exports = function(passport) {
  var opts = {};
  opts.secretOrKey = secret;
  opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
  passport.use(new JwtStrategy(
    opts, 
    function(jwt_payload, done) {
      debug(jwt_payload)
      Player.findOne({id: jwt_payload.id}, function(err, player) {
          if (err) {
              return done(err, false);
          }
          if (player) {
              done(null, player);
          } else {
              done(null, false);
          }
      });
    }
  ));
};