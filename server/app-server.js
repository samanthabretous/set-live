const express = require('express');
const path = require('path')
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
 
// Start the server
var port = process.env.PORT || 3000;
server.listen(port, function() {
  console.log("Running on port ", port);
});
 
// Serve the client
var staticPath = path.join(__dirname, '../client/public');
app.use(express.static(staticPath));
app.get('/', function(req, res) {
  res.sendfile(__dirname + '/public/index.html');
});
 
// Handle socket.io
require('./io.js')(app, io);







