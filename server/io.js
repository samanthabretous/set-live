module.exports = ((app,io)=>{
  const _ = require ('lodash'),
        Player = require('./models').player,
        Card = require('./models').card,
        Game = require('./models').game,
        DeckOfCards = require('./models')['deck_of_cards'],
        db = require('./models'),
        dealCards = require('./utils/game').dealCards,

        //passport 
        secret = require('./config/passport').secretOrKey,
        jwt = require('jsonwebtoken'),
        socketioJwt = require('socketio-jwt'),
        debug = require('debug')('SOCKET');


  //Connect to the socket
  io.sockets.on('connection', socketioJwt.authorize({
    secret: secret,
    timeout: 15000 // 15 seconds to send the authentication message 
  })).on('authenticated', socket => {

       debug('hello! ' + socket.decoded_token);

    //when socket is disconnected remove player from the connections array
    // socket.once('disconnect', function() {
    //   socket.leave();
    //   socket.disconnect();
    //   console.log("Disconnected");
    // });

    /*
    * @param {String} payload. holds room name and username
    * @returns {Object} game room
    */
    //create and/or join a room
    // socket.on('enterGameRoom', (payload) => {

    //   //find player in database and save
    //   let socketPlayer = null; 
    //   let currentGame = null;
    //   Player.findOne({
    //     where: {
    //       username: payload.username
    //     }
    //   })
    //   .then(foundPlayer => {
    //     socketPlayer = foundPlayer
    //   })
    //   .then(()=>{
    //     //see if room exist in the database
    //     return Game.findOne({
    //       where: {
    //         room: payload.roomName
    //       }, 
    //       include: Player
    //     })
    //   })
    //   .then(game => {
    //     if(!game){
    //       // game does not exist already then   
    //       return Game.create({
    //           room: payload.roomName,
    //       })
    //     } else {
    //       return game
    //     }
    //   })
    //   .then(game =>{

    //     //handle if game was recently created 
    //     const playersInGame = game.get('players') ? game.get('players').length : 0
    //     const maxPlayers = game.get('maxPlayers')

    //     //make sure there is space left in the game
    //     if(playersInGame < maxPlayers){

    //       // add player to room and let other players in room know there is a new player
    //       game.addPlayers([socketPlayer.id])
    //       game.addCards(_.range(1,82), {cardOrder: 100})
    //       const allPlayers = game.get('players') ? game.get('players').concat(socketPlayer) : socketPlayer

    //       socket.join(payload.roomName)
    //       io.sockets.in(payload.roomName).emit('addPlayer', socketPlayer);

    //       //send a message to player and let them know how many more people they can invite
    //       socket.emit('goToGame', {game, players: allPlayers});
    //       return game
    //     } else {
          
    //       // if room is full. tell player
    //       socket.emit('roomFull', true);
    //     }

    //   })
    //   //shuffle cards now and update card order in joins table
    //   .then(game => {
    //     if(game) {
    //       return Game.findById(game.id, 
    //         {include:[Card]})
    //     }
    //   })
    //   .then(game =>{
    //     currentGame = game
    //     return game.getCards()
    //   })
    //   .then(cards => {
    //     if(cards){

    //       let shuffledCards = _.shuffle(cards)
          
    //       return shuffledCards.map((card, index) => {

    //         //update place in minic array
    //         return DeckOfCards.update(
    //           {
    //             cardOrder: index
    //           },
    //           {
    //             where : {
    //               cardCard: card.card,
    //               $and: {
    //                 gameId: currentGame.id
    //               }
    //             }
    //           }
    //         )
    //       })
    //     }//if(game)
    //   })
    //   .catch(err =>{
    //     debug(err)
    //   })

    // }) //'enterGameRoom'

    /* @params {Number} gameId
     * add cards to the game board to being game
     * @returns {Object} game room
    */
    // socket.on('startNewGame', gameId => {
    //   let currentGame = null;
    //   debug(gameId)
        
    //   Game.findOne({
    //     where: {
    //       id: gameId
    //     }, 
    //     include: [Card]
    //   })
    //   .then(game =>{
    //     socket.join(game.room)
    //     game.update({started: true});
    //     currentGame = game;
    //     return game.getCards();
    //   })
    //   .then(cards =>{
    //     io.sockets.in(currentGame.room).emit('gameStarted', cards)

    //   })
    // }) //startNewGame

    /* @params {Object} payload gameId and token
    */
    // socket.on('isGameStarted', payload =>{
    //   let game = null;
    //   let cards = null;
    //   let players = null;
    //   const {gameId, token} = payload
    //   const playerToken = token.split(' ')[1]
    //   const decoded = jwt.decode(token, secret);

    //   Game.findById(gameId, {include: [Card, Player]})
    //   .then(currentGame => {
    //     game = currentGame;
    //     return currentGame.getCards();
    //   })
    //   .then(gameCards => {
    //     cards = gameCards
    //     return game.get('players')
    //   })
    //   .then(allPlayers =>{
    //     players = allPlayers;
    //     return game.get('started');
    //   })
    //   .then(started =>{
    //     if(started){
    //       socket.emit('reloadGame', {cards, players, game, started})
    //     } else {
    //       socket.emit('goToGame', {game, players});
    //     } 
    //   })
    // })

    /* @params {Object} payload
    * return {Object} playerInfo, updatedDeck 
    */
    // socket.on('set', payload =>{
    //   const {clickedCards, gameId} = payload
    //   let game = null;
    //   let cards = null;
    //   Game.findById(gameId, {
    //     include: Card
    //   })
    //   .then(currentGame =>{
    //     game = currentGame;
    //     return currentGame.getCards()
    //   })
    //   .then(gameCards =>{
    //     cards = gameCards;
    //     _.map(clickedCards, (card) => {
    //       //remove association with game
    //       game.removeCard(card.card)
    //     })
    //     Player.findById
    //   })
    //   .then()
    // })

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