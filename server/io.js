module.exports = ((app,io)=>{
  const _ = require ('lodash');
  const Player = require('./modelObjs/Player');
  const Game = require('./modelObjs/Game')
  const debug = require('debug')('OH_GOSH')

  let games = {};
  let maxPlayers = 1;
  let board = [];
  let players = []

  //Connect to the socket
  io.sockets.on('connection', function(socket){

    //when socket is disconnected remove player from the connections array
    socket.once('disconnect', function() {

      //find player within all the games
      let listOfGames = Object.keys(games)
      let foundPlayer = listOfGames.map(game => {
        return _.find(games[game].players, (o) => { return o.id === socket.id
        })
      })

      //once player is found, remove that player from the game object
      let foundRoom = foundPlayer[0] && foundPlayer[0].room ? foundPlayer[0].room : null;
      if(foundRoom) {

        let players = games[foundRoom].players
        let index = _.findIndex(players, (o) => o.id === socket.id)
        players.splice(index, 1)

        //let all players in the room know that the player has left
        if(games[foundRoom].players.length > 0) {
          io.sockets.in(foundPlayer.room).emit('leftPlayer', foundPlayer)

        //if there are no players left in the room remove the room from the game obj
        } else {
          delete games[foundRoom];
        }
      }
      console.log(games)
      socket.disconnect();
      console.log("Disconnected");
    });

    /*
    * @param {Object} payload. holds login form infomation
    * check to see if that username or password exist already in the database
    * if it has let the user know. 
    * else add user to database.
    * @returns {}
    */
    socket.on('login', payload => {
      debug(payload)
    })

    //create and/or join a room
    socket.on('enterGameRoom', (payload) => {
      let newMember = new Player({
        id: socket.id,
        name: payload.username, 
      });

      //check if the room exist and make sure there is space in the room
      let roomName = payload.roomName;
      if(games[roomName] && !games[roomName].isRoomFull()){

        //place member in room and update game object
        socket.join(roomName);
        newMember.addRoom(roomName);
        games[roomName].players.push(newMember);

        //let all players in room know there is a new player
        io.sockets.in(roomName).emit('players', games[roomName].players);
      } 

      //if room exist but is full. tell player
      else if (games[roomName] && games[roomName].isRoomFull()) {
          socket.emit('roomFull', true);

      // if game room has not been created
      } else {
        socket.join(roomName);
        newMember.addRoom(roomName);
        games[roomName] = new Game(roomName, newMember);
        socket.emit('players', games[roomName].players);
      }

      socket.emit('joined', newMember);

      //send a message to all players and let them know how many more people they can invite
      socket.emit('invitePlayersToRoom', {roomName, players: games[roomName].players});
    })

    socket.on('startNewGame', roomName => {
      if(games[roomName]){
        let game = games[roomName]
        if(game.cards) {
          game.dealCards(io) 
        }
      }
    })

    //refactor this to work with the newMember variable
    socket.on('new message', (msg) => {
      io.emit('received message', msg)
    })

    // when a new client window is connected
    console.log("Connected")
  })

}) //module.exports closing