const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const path = require('path');
const applyExpressMiddleware = require('./middleware');
const routes = require('./routes');
const _ = require('lodash');
const debug = require('debug')('SERVER');

// passport
const passport = require('passport');
const passportJWT = require('passport-jwt');
const socketioJwt = require('socketio-jwt');
const secretOrKey = 'setLiveSecurity';
const jwt = require('jsonwebtoken');

const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;
const jwtFromRequest = ExtractJwt.fromAuthHeader();


const app = express();
applyExpressMiddleware(app);
app.use(passport.initialize());

const strategy = new JwtStrategy({ secretOrKey, jwtFromRequest }, (jwt_payload, done) => {
  debug('payload received', jwt_payload);
  // usually this would be a database call:
  Player.findOne({ id: jwt_payload.id })
  .then((player) => {
    if (player) {
      done(null, player);
    } else {
      done(null, false);
    }
  })
  .catch(err => done(err, false));
});

passport.use(strategy);

// api routes
app.use('/api/player', routes.player);
app.use('/api/game', routes.game);
app.use('/api/card', routes.card);
app.use('/api', routes.api);

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/public/index.html'));
});

// Handle socket.io
const server = require('http').Server(app);
const io = require('socket.io')(server);
require('./io.js')(app, io);

module.exports = server;
