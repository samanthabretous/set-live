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



  // DeckOfCards.findAll({
  //   where:{
  //     gameId: 12
  //   },
  //   order: ['cardOrder']
  // })
  // .then(deck => {
  //   debug(deck)
  // })
  io.sockets.on('connection', socketioJwt.authorize({
    secret: secret,
    timeout: 15000 // 15 seconds to send the authentication message 
  })).on('authenticated', socket => {
    debug(socket.id)
    debug('hello! ' + socket.decoded_token);

    //when socket is disconnected remove player from the connections array
    socket.once('disconnect', function() {
      socket.leave();
      socket.disconnect();
      console.log("Disconnected");
    });

    socket.on('getPlayerInfo', payload => {
      const playerId = socket.decoded_token.id;
      Player.findById(playerId, {include: Game})
      .then(player => {
        if (!player) {
          socket.emit('receivePlayerInfo',{success: false, msg: 'Authentication failed. Player not found.'});
        } else {
          socket.emit('receivePlayerInfo',{success: true, msg: 'Welcome in the member area ' + player.username + '!', playerInfo: player});
        }
      });
    })

    /*
    * @param {String} payload. holds room name and username
    * @returns {Object} game room
    */
    //create and/or join a room
    socket.on('enterGameRoom', (payload) => {
      debug(payload)
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

          const allPlayers = game.get('players') ? game.get('players').concat(socketPlayer) : socketPlayer

          socket.join(payload.roomName)
          io.sockets.in(payload.roomName).emit('addPlayer', socketPlayer);

          //send a message to player and let them know how many more people they can invite
          socket.emit('goToGame', {game, players: allPlayers});

          //add card randomly to deck
          const shuffledNumbers = _.shuffle(_.range(1,82))
          _.map(shuffledNumbers, (number, index) => {
            game.addCards(number, {cardOrder: index})
          })

          return game
        } else {
          
          // if room is full. tell player
          socket.emit('roomFull', true);
        }

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
        io.sockets.in(currentGame.room).emit('gameStarted', cards)

      })
    }) //startNewGame

    /* @params {Object} payload gameId and token
    */
    socket.on('isGameStarted', payload =>{
      let game = null;
      let cards = null;
      let players = null;
      const {gameId, token} = payload

      Game.findById(gameId, {include: [Card, Player]})
      .then(currentGame => {
        socket.join(currentGame.room)
        game = currentGame;
        return currentGame.getCards();
      })
      .then(gameCards => {
        cards = gameCards
        return game.get('players')
      })
      .then(allPlayers =>{
        players = allPlayers;
        return game.get('started');
      })
      .then(started =>{
        if(started){
          socket.emit('reloadGame', {cards, players, game, started})
        } else {
          socket.emit('goToGame', {game, players});
        } 
      })
    })

    /* @params {Object} payload
    * return {Object} playerInfo, updatedDeck 
    */
    socket.on('set', payload =>{
      debug("set", payload)
      const {clickedCards, gameId} = payload
      let game = null;
      let player = null;
      Game.findById(gameId, {
        include: Card
      })
      .then(currentGame =>{
        game = currentGame;
        return currentGame.getCards();
      })
      .then(gameCards =>{
        _.map(clickedCards, (card) => {
          //remove association with game
          game.removeCard(card.card)
        })
        return Player.findById(socket.decoded_token.id);
      })
      .then(socketPlayer => {
        player = socketPlayer;
        socketPlayer.increment('matches');
      })
      .then(()=>{
        return game.getCards();
      })
      .then(cards => {
        debug("set2",game.room)
        io.sockets.in(game.room).emit('updateGame', {cards, playerSet: player.username});
      })
    })

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