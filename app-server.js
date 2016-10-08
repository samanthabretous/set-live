const express = require('express');
const _ = require ('underscore')
const app = express();

let connections = [];
let players = [];

app.use(express.static('./public'))

const server = app.listen(3000)
const io = require('socket.io').listen(server)

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

  // when a client window is disconnected to the server
  socket.once('disconnect', function() {

    //search audience array for any member that has the same id as the one that disconnected
    let member = _.findWhere(players,{id:this.id});
    if(member){
      players.splice(players.indexOf(member, 1))
      io.sockets.emit('players', players);
      console.log('Left %s (%s players)', member.name, players.length)
    }

    connections.splice(connections.indexOf(socket),1);
    socket.disconnect();
    console.log('disconnected %s sockets remaining', connections.length)
  })

  socket.on('join', function(payload) {
    let newMember = {
      id: this.id,
      name: payload.name,
      type: "member"
    }
    this.emit('joined', newMember);
    players.push(newMember);
    io.sockets.emit('audience', players)
    console.log('Player Joined: %s ', payload.name)
  })

  socket.emit('welcome',{
    players: players,
  })

  // when a new client window is connected
  connections.push(socket)
  console.log("Connected: %s sockets connections", connections.length)

})

console.log('SET is running on port 3000')  
