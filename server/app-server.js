const express = require('express');
const path = require('path')
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

// Start the server
app.set('port', process.env.PORT || 4000);

server.listen(app.get('port'), function() {
  console.log("Running on port ", 4000);
});
 
// Serve the client
var staticPath = path.join(__dirname, '../client/public');
app.use(express.static(staticPath));


app.get('/room', function(req, res){
    console.log(req.query);

    //var room = rooms[req.query.name];

    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(room));
});
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, '../client/public/index.html'));
});
 
// Handle socket.io
require('./io.js')(app, io);







