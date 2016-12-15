module.exports = ((app,io)=>{
  const _ = require ('underscore');
  const Player = require('./models/Player');
  const Game = require('./models/Game')


  let games = {};
  let maxPlayers = 1;
  let rooms = ['gameRoom', 'waitingRoom']
  let connections = [];
  let board = [];
  let waitingPlayers = []
  let players = []
  let playingCards = []
  let gameRoom = "gameRoom";
  let waitingRoom = 'waitingRoom'

  //Connect to the socket
  io.sockets.on('connection', function(socket){

    //when socket is disconnected remove player from the connections array
    socket.once('disconnect', function() {
      var member = _.findWhere(players, { id: this.id });
      if (member) {
        players.splice(players.indexOf(member), 1);
        io.sockets.emit('players', players);
        console.log("Left: %s (%s players members)", member.name, players.length);
      }
      socket.leave(waitingRoom);
      connections.splice(connections.indexOf(socket), 1);
      //socket.leave(socket.room);
      socket.disconnect();
      console.log("Disconnected: %s sockets remaining.", connections.length);
    });

    //create and/or join a room
    socket.on('enterGameRoom', (payload) => {
      let roomName = payload.roomName;
      let newMember = new Player({
        id: socket.id,
        name: payload.username, 
      });

      //check if the room exist and make sure there is space in the room
      if(games[roomName] && !games[roomName].isRoomFull()){
        socket.join(roomName);
        games[roomName].players.push(newMember);
        newMember.addRoom(roomName);
        io.sockets.in(roomName).emit('players', games[roomName].players);
      } 

      //if room exist but is full. tell player
      else if (games[roomName] && games[roomName].isRoomFull()) {
          socket.emit('roomFull', true);
      } else {
        socket.join(roomName);
        games[roomName] = new Game(roomName, newMember);
        newMember.addRoom(roomName);
        socket.emit('players', games[roomName].players);

        //tell the person who created the room to invite people
        socket.emit('invitePlayersToRoom', roomName);
      }
      console.log(newMember)
      socket.emit('joined', newMember);
    })

    socket.on('startNewGame', roomName => {
      if(games[roomName]){
        let game = games[roomName]
        game.dealCards(io)
      }
    })

    //refactor this to work with the newMember variable
    socket.on('new message', (msg) => {
      io.emit('received message', msg)
    })

    // when a new client window is connected
    connections.push(socket)
    console.log("Connected: %s sockets connections", connections.length)
  })

}) //module.exports closing