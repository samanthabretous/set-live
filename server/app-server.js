const express = require('express'),
      cookieParser = require('cookie-parser'),
      session = require('express-session'),
      path = require('path'),
      bodyParser = require('body-parser'),
      app = express(),
      server = require('http').Server(app),
      io = require('socket.io')(server),
      routes = require('./routes'),
      db = require('./models'),
      Player = require('./models').player,
      //user = require('./routes/user'),
      _ = require('lodash'),
      debug = require('debug')('SERVER'),
      
      //passport
      passport = require('passport'),
      //application = require('./routes/application'),
      passportJWT = require("passport-jwt"),
      ExtractJwt = passportJWT.ExtractJwt,
      JwtStrategy = passportJWT.Strategy,
      jwt  = require('jsonwebtoken');

//serving webpack
// const webpack = require('webpack'),
//       webpackDevMiddleware = require('webpack-dev-middleware'),
//       webpackHotMiddleware = require('webpack-hot-middleware'),
//       config = require('../webpack.config'),
//       compiler = webpack(config);

// app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }))
// app.use(webpackHotMiddleware(compiler))

// Client
const staticPath = path.join(__dirname, '../client/public');
app.use(express.static(staticPath));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
//app.use(session({secret: "setlivesecurity"}))
//app.use(cookieParser())
app.use(passport.initialize())
//app.use(passport.session())

// Enable CORS from client-side
app.use(function(req, res, next) {  
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeader();
jwtOptions.secretOrKey = 'setLiveSecurity';

const strategy = new JwtStrategy(jwtOptions, function(jwt_payload, done) {
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



db.sequelize
.sync()
.then(() => {

  app.set('port', process.env.PORT || 4000);

  server.listen(app.get('port'), function() {
    console.log("Running on port ", 4000);
  });

  // app.get('/logout', application.destroySession)
  // app.post('/authenticate',
  //   passport.authenticate('local',{
  //     successRedirect: '/play',
  //     failureRedirect: '/'
  //   })
  // )

  //api routes
  app.use('/api/player', routes.player)
  app.use('/api/game', routes.game)
  app.use('/api/card', routes.card)
  app.use('/api', routes.api)



  app.get('/*',(req, res) => {
    res.sendFile(path.join(__dirname, '../client/public/index.html'));
  });
   
  //handle passport
  //allows the useage of jwt strategy
  //require(routes.api)(app, passport)

  // Handle socket.io
  require('./io.js')(app, io);
  
})



