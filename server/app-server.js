const express = require('express');
const _ = require ('underscore')
const app = express();

let connections = [];
var board = 'This will be the board'

app.use(express.static('../client/src/public'))

const server = app.listen(3000)
const io = require('socket.io').listen(server)

//Connect to the socket
io.sockets.on('connection', function(socket){
  console.log('we have a connection')
  //set username
  // socket.on('new message', function(msg){
  //   io.emit('received message', msg)
  // })

  socket.once('disconnect', function() {
    connections.splice(connections.indexOf(socket), 1);
    socket.disconnect();
    console.log("Disconnected: %s sockets remaining.", connections.length);
  });

  socket.on('join', function(payload) {
    var newMember = {
      id: this.id,
      name: payload.name
    };
    this.emit('joined', newMember);
    console.log("Player Joined: %s", payload.name);
  });

  //come back to this
  socket.emit('board', {
    board: board
  })

  // when a new client window is connected
  connections.push(socket)
  console.log("Connected: %s sockets connections", connections.length)

})

  console.log('SET is running on port 3000') 
 
