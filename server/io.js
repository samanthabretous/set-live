const _ = require ('underscore');
const deckOfCards = require('../client/src/card_deck.js')


module.exports = ((app,io)=>{
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
    //set username

    socket.once('disconnect', function() {
      var member = _.findWhere(players, { id: this.id });
      if (member) {
        players.splice(players.indexOf(member), 1);
        io.sockets.emit('players', players);
        console.log("Left: %s (%s players members)", member.name, players.length)
      }
      socket.leave(waitingRoom)
      connections.splice(connections.indexOf(socket), 1);
      socket.disconnect();
      console.log("Disconnected: %s sockets remaining.", connections.length);
    });

    socket.on('join', function(payload) {
      let newMember = {
        id: this.id,
        name: payload.name, 
      };
      if(players.length < 7){
        socket.join(gameRoom);
        players.push(newMember);
      } else {
        socket.join(waitingRoom)
        waitingPlayers.push(newMember);
        
      }
      this.emit('players', players);
      this.emit('waitingPlayers', waitingPlayers);
      //console.log(connections.length)
      this.emit('connections', connections.length)
      this.emit('joined', newMember);
      //console.log("Players Joined: %s", payload.name);

    });

    socket.on('startNew', function(){
      if (waitingPlayers.length >= 1 && players.length < 7){
        let loopUntil = waitingPlayers.length > 7 ? 7 : waitingPlayers.length 
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


   

})