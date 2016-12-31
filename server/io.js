module.exports = ((app,io)=>{
  const _ = require ('lodash'),
        Player = require('./models').player,
        Card = require('./models').card,
        Game = require('./models').game,
        DeckOfCards = require('./models')['deck_of_cards'],
        db = require('./models'),
        dealCards = require('./utils/game').dealCards,
        debug = require('debug')('OH_GOSH');


  //Connect to the socket
  io.sockets.on('connection', function(socket){

    //when socket is disconnected remove player from the connections array
    socket.once('disconnect', function() {
      socket.leave();
      // //find player within all the games
      // let listOfGames = Object.keys(games)
      // let foundPlayer = listOfGames.map(game => {
      //   return _.find(games[game].players, (o) => { return o.id === socket.id
      //   })
      // })

      // //once player is found, remove that player from the game object
      // let foundRoom = foundPlayer[0] && foundPlayer[0].room ? foundPlayer[0].room : null;
      // if(foundRoom) {

      //   let players = games[foundRoom].players
      //   let index = _.findIndex(players, (o) => o.id === socket.id)
      //   players.splice(index, 1)

      //   //let all players in the room know that the player has left
      //   if(games[foundRoom].players.length > 0) {
      //     io.sockets.in(foundPlayer.room).emit('leftPlayer', foundPlayer)

      //   //if there are no players left in the room remove the room from the game obj
      //   } else {
      //     delete games[foundRoom];
      //   }
      // }
      // console.log(games)
      socket.disconnect();
      console.log("Disconnected");
    });

    /*
    * @param {String} payload. holds room name and username
    * @returns {Object} game room
    */
    //create and/or join a room
    socket.on('enterGameRoom', (payload) => {

      //find player in database and save
      let socketPlayer = null; 
      let currentGame = null;
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
          })
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
          game.addPlayers([socketPlayer.id])
          game.addCards(_.range(1,82), {cardOrder: 100})
          let allPlayers = game.get('players') ? game.get('players').concat(socketPlayer) : socketPlayer

          socket.join(payload.roomName)
          io.sockets.in(payload.roomName).emit('addPlayer', socketPlayer);

          //send a message to player and let them know how many more people they can invite
          socket.emit('goToGame', {game, players: allPlayers});
          return game
        } else {
          
          // if room is full. tell player
          socket.emit('roomFull', true);
        }

      })
      //shuffle cards now and update card order in joins table
      .then(game => {
        if(game) {
          return Game.findById(game.id, 
            {include:[Card]})
        }
      })
      .then(game =>{
        currentGame = game
        return game.getCards()
      })
      .then(cards => {
        if(cards){

          let shuffledCards = _.shuffle(cards)
          
          return shuffledCards.map((card, index) => {

            //update place in minic array
            return DeckOfCards.update(
              {
                cardOrder: index
              },
              {
                where : {
                  cardCard: card.card,
                  $and: {
                    gameId: currentGame.id
                  }
                }
              }
            )
          })
        }//if(game)
      })
      .catch(err =>{
        debug(err)
      })

    }) //'enterGameRoom'

    /* @params {Number} gameId
     * add cards to the game board to being game
     * @returns {Object} game room
    */
    socket.on('startNewGame', gameId => {
      let currentGame = null;
      debug(gameId)
        
      Game.findOne({
        where: {
          id: gameId
        }, 
        include: [Card]
      })
      .then(game =>{
        socket.join(game.room)
        game.update({started: true});
        currentGame = game;
        return game.getCards();
      })
      .then(cards =>{
        //         io.of('/').in(payload.roomName).clients(function(error, clients){
        //   if (error) throw error;
        //   debug("clients",clients); 
        //   debug('room', socket.rooms)
        // });
        io.sockets.in(currentGame.room).emit('gameStarted', cards)
      })
    }) //startNewGame

    //refactor this to work with the newMember variable
    // socket.on('new message', (msg) => {
    //   io.emit('received message', msg)
    // })

    // when a new client window is connected
    console.log("Connected")
  })

}) //module.exports closing

//remove association with deck
 // currentGame.removeCard(card.card)
           // currentGame.addCard(card.card, { cardOrder: index })
        // io.of('/').in(payload.roomName).clients(function(error, clients){
        //   if (error) throw error;
        //   debug("clients",clients); 
        //   debug('room', socket.rooms)
        // });