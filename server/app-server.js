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
      debug = require('debug')('SERVER')
      
      //passport
      passport = require('passport'),
      jwt  = require('jwt-simple'),
      passportConfig = require('./config/passport'),
      application = require('./routes/application');
  
 
// Client
const staticPath = path.join(__dirname, '../client/public');
app.use(express.static(staticPath));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(cookieParser())
app.use(passport.initialize())
app.use(passport.session())

db.sequelize
.sync()
.then(() => {

  app.set('port', process.env.PORT || 4000);

  server.listen(app.get('port'), function() {
    console.log("Running on port ", 4000);
  });

  //api routes
  app.use('/api/player', routes.player)
  app.use('/api/game', routes.game)
  app.use('/api/card', routes.card)
  app.use('/api', routes.api)

  app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, '../client/public/index.html'));
  });
   
  //handle passport
  //allows the useage of jwt strategy
  require('./config/passport')(passport)

  // Handle socket.io
  require('./io.js')(app, io);
  
})

module.exports = app










