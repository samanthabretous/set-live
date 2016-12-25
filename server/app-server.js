const express = require('express');
const path = require('path')
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

//sequelize
const bodyParser = require('body-parser')
const db = require('./models');



// Start the server
 
// Client
var staticPath = path.join(__dirname, '../client/public');
app.use(express.static(staticPath));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

db.sequelize.sync()
.then(() => {
  app.set('port', process.env.PORT || 4000);

  server.listen(app.get('port'), function() {
    console.log("Running on port ", 4000);
  });

  //api routes
  const routes = require('./routes');
  app.use('/api/player', routes.player)
  app.use('/api/game', routes.game)
  app.use('/api/card', routes.card)

  app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, '../client/public/index.html'));
  });
   
  // Handle socket.io
  require('./io.js')(app, io);
})

module.exports = app










