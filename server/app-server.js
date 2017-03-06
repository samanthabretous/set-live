const express = require('express'),
      cookieParser = require('cookie-parser'),
      session = require('express-session'),
      path = require('path'),
      app = express(),
      applyExpressMiddleware = require('./middleware'),
      routes = require('./routes'),
      _ = require('lodash'),
      debug = require('debug')('SERVER'),
      
      //passport
      passport = require('passport'),
      //application = require('./routes/application'),
      passportJWT = require("passport-jwt"),
      socketioJwt = require('socketio-jwt'),
      secretOrKey = require('./config/passport').secretOrKey,
      jwtFromRequest = require('./config/passport').jwtFromRequest,
      ExtractJwt = passportJWT.ExtractJwt,
      JwtStrategy = passportJWT.Strategy,
      jwt  = require('jsonwebtoken');

applyExpressMiddleware(app);
app.use(passport.initialize())

const strategy = new JwtStrategy({secretOrKey, jwtFromRequest}, function(jwt_payload, done) {
  debug('payload received', jwt_payload);
  // usually this would be a database call:
  Player.findOne({id: jwt_payload.id})
  .then(player => {
      if (player) {
          done(null, player);
      } else {
          done(null, false);
      }
  }) 
  .catch(err =>{
    return done(err, false);
  });
}); 

passport.use(strategy);

//api routes
app.use('/api/player', routes.player)
app.use('/api/game', routes.game)
app.use('/api/card', routes.card)
app.use('/api', routes.api)

app.get('/*',(req, res) => {
  res.sendFile(path.join(__dirname, '../client/public/index.html'));
});

// Handle socket.io
const server = require('http').Server(app),
      io = require('socket.io')(server);
require('./io.js')(app, io);
  
module.exports = server




