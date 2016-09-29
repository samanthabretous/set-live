var express = require('express'),
    app = express(),
    path = require('path'),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server);

//Connect to the socket
io.sockets.on('connection', function(socket){
  console.log('we have a connection')
  //set username
  socket.on('new message', function(msg){
    io.emit('received message', msg)
  })

  socket.on('test', function(){
    console.log('mounted')
  })

})

//Index Route
app.get('/', function(req, res){
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/css/style.css', function(req, res){
  res.sendFile(__dirname + '/css/style.css');
});

app.get('/js/bundle.js', function(req, res){
  res.sendFile(__dirname + '/js/bundle.js');
});

server.listen(3000, function(){
  console.log('server started 3000')
})