var express = require('express'),
    app = express(),
    path = require('path'),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    users = [];

//Set the view engine
// app.set('views', __dirname + '/views');
// app.set('view engine', 'jade');
// app.engine('jade', require('jade').__express)

// //Set static path
// app.use(express.static(path.join(__dirname, 'public')))

//Connect to the socket
io.sockets.on('connection', function(socket){
  console.log('we have a connection')
  //set username
  socket.on('new message', function(msg){
    console.log(msg);
    io.emit('received message', msg)
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

server.listen(3000)
console.log('server started 3000')