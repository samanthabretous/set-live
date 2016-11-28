const express = require('express');
const path = require('path')
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

// Start the server
app.set('port', process.env.PORT || 4000);
server.listen(app.get('port'), function() {
  console.log("Running on port ", server.address().port);
});
 
// Serve the client
var staticPath = path.join(__dirname, '../client/public');
app.use(express.static(staticPath));

app.get('/', function(req, res) {
  res.sendfile(__dirname + '../client/public/index.html');
});

app.get('/room', function(req, res){
    console.log(req.query);

    //var room = rooms[req.query.name];

    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(room));
});
 
// Handle socket.io
require('./io.js')(app, io);







