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


    socket.once('disconnect', function() {
      var member = _.findWhere(players, { id: this.id });
      if (member) {
        players.splice(players.indexOf(member), 1);
        io.sockets.emit('players', players);
        console.log("Left: %s (%s players members)", member.name, players.length);
      }
      socket.leave(waitingRoom);
      connections.splice(connections.indexOf(socket), 1);
      socket.disconnect();
      console.log("Disconnected: %s sockets remaining.", connections.length);
    });

    socket.on('enterGameRoom', (payload)=>{
      let roomName = payload.roomName;
      let newMember = new Player({
        id: socket.id,
        name: payload.username, 
      });
      socket.emit('joined', newMember);
      // this.emit('players', players);
      io.sockets.emit('connections', connections.length);

      //check if the room exist and if so make sure there is space in the room
      if(games[roomName] && !games[roomName].isRoomFull()){
        console.log(games[roomName].players)
        socket.join(roomName)
        games[roomName].players.push(newMember)
      } 

      //if room exist but is full. tell player
      else if (games[roomName] && games[roomName].isRoomFull()) {
        console.log(roomName)
          socket.emit('roomFull', true)
      } else {
        console.log('new')
        games[roomName] = new Game(roomName, newMember);

        //tell the person who created the room to invite people
        socket.emit('invitePlayersToRoom')
      }
    })

    socket.on('startNew', function(){
      if (waitingPlayers.length >= 1 && players.length < 7){
        let loopUntil = waitingPlayers.length > 7 ? 7 : waitingPlayers.length;
        for(let i = 0; i < loopUntil; i++){
          //find player and move them to the gameroom
          console.log(waitingPlayers)
          console.log(players)
          let playerId = waitingPlayers[i].id
          let clients = io.of('/').in(waitingRoom)
          let player = clients.sockets[playerId]
          //let roomWait = clients.sockets[playerId].adapter.rooms
          if(player){
            player.leave(waitingRoom)
            player.join(gameRoom)
            //console.log(player.nsp.adapter.rooms)
            players.push(waitingPlayers[i])
            io.to(gameRoom).emit('message', gameRoom)
            waitingPlayers.shift()
          }
        }

        io.sockets.emit('waitingPlayers', waitingPlayers);
        io.sockets.emit('players', players);
      }
    })

    socket.on('loadBoard', (newBoard) => {
      board = [...board, newBoard]
      io.emit('boardLoad', board)
    })

    //refactor this to work with the newMember variable
    socket.on('new message', (msg) => {
      io.emit('received message', msg)
    })

    //come back to this
    socket.emit('board', {
      board: board
    })
    
    socket.on('cards', (cards) => {
      playingCards.push(...cards.cards)
      //console.log(cards.cards)
      io.sockets.emit('updateCards', {cards: playingCards})
    })

    // when a new client window is connected
    connections.push(socket)
    console.log("Connected: %s sockets connections", connections.length)
  })

}) //module.exports closing