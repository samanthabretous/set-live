module.exports = ((app,io)=>{
  const _ = require ('lodash');
  const Player = require('./models').player;
  const Card = require('./models').card;
  const Game = require('./models').game;
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
    * @param {String} payload. holds room name and username
    * @returns {Object} game room
    */
    //create and/or join a room
    socket.on('enterGameRoom', (payload) => {
      debug(payload)
      //find player in database and save
      let socketPlayer = null; 
      Player.findOne({
        where: {
          username: payload.username
        }
      })
      .then(foundPlayer => {
        socketPlayer = foundPlayer
      })
      .then(()=>{
        //see if room exist in the database
        return Game.findOne({
          where: {
            room: payload.roomName
          }, 
          include: Player
        })
      })
      .then(game => {
        if(!game){
          // game does not exist already then   
          return Game.create({
              room: payload.roomName,
              board:[false, false, false, false, false, false, false, false, false,false, false, false]
            }
          )
        } else {
          return game
        }
      })
      .then(game =>{

        //handle if game was recently created 
        const playersInGame = game.get('players') ? game.get('players').length : 0
        const maxPlayers = game.get('maxPlayers')

        //make sure there is space left in the game
        if(playersInGame < maxPlayers){

          // add player to room and let other players in room know there is a new player
          debug(socketPlayer)
          game.addPlayers([socketPlayer.id])
          let allPlayers = game.get('players') ? game.get('players').concat(socketPlayer) : socketPlayer
          socket.join(payload.roomName);
          socket.in(payload.roomName).emit('players', socketPlayer);

          //send a message to player and let them know how many more people they can invite
          socket.emit('goToGame', {game: game, room: payload.roomName, players: allPlayers});
          return game
        } else {
          
          // if room is full. tell player
          socket.emit('roomFull', true);
        }

      })

    }) //'enterGameRoom'

    /* @params {Number} gameId
     * add cards to the game board to being game
     * @returns {Object} game room
    */
    socket.on('startNewGame', gameId => {
      Games.findById(gameId)
      .then(game =>{

        //deal cards
      })

    })

    //refactor this to work with the newMember variable
    socket.on('new message', (msg) => {
      io.emit('received message', msg)
    })

    // when a new client window is connected
    console.log("Connected")
  })

}) //module.exports closing