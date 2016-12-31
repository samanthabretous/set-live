const passport = require('passport'),
      JwtStrategy = require('passport-jwt').Strategy,
      ExtractJwt = require('passport-jwt').ExtractJwt,
      secret = require('./secret'),
      db = require('../models'),
      Player = require('../models').player,
      debug = require('debug')('PASSPORT')

// For Authentication Purposes
// module.exports = function(passport) {
//   var opts = {};
//   opts.secretOrKey = secret;
//   opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
//   passport.use(new JwtStrategy(
//     opts, 
//     function(jwt_payload, done) {
//       debug(jwt_payload)
//       Player.findOne({id: jwt_payload.id}, function(err, player) {
//           if (err) {
//               return done(err, false);
//           }
//           if (player) {
//               done(null, player);
//           } else {
//               done(null, false);
//           }
//       });
//     }
//   ));
// };

// Serialize Sessions
// passport.serializeUser((user, done) => {
//   debug("serializeUser")
//   done(null, user);
// });

// //Deserialize Sessions
// passport.deserializeUser((player, done) => {
//   debug("deserializeUser")
//   Player.find({where: {id: player.id}})
//   .then(player => {
//     done(null, player);
//   })
//   .catch(function(err){
//     done(err, null)
//   });
// });

// For Authentication Purposes
// passport.use( new LocalStrategy(
//   function(username, password, done){
//     debug("LocalStrategy")
//     Player.find({where: {username: username}})
//     .then(player => {
//       passwd = player ? player.password : '';
//       isMatch = Player.validPassword(password, passwd, done, player)
//     })
//     .catch(err => debug(err));
//   }
// ));
var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeader();
jwtOptions.secretOrKey = 'setLiveSecurity';

module.exports = {
  jwtOptions,
}