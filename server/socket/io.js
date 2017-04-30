const _ = require('lodash');
const socketioJwt = require('socketio-jwt');
const debug = require('debug')('SOCKET');
const dealCards = require('../utils/game').dealCards;
const { getPlayerInfo, getGameInfo, startNewGame, isGameStarted, set } = require('./aggregation');
const { enterGameRoom } = require('./enterGameRoom');

module.exports = ((app, io) => {
  // socket authentication
  const secret = 'setLiveSecurity';

  io.sockets.on('connection', socketioJwt.authorize({
    secret,
    timeout: 15000, // 15 seconds to send the authentication message
  })).on('authenticated', (socket) => {
    debug(`hello! ${socket.decoded_token}`);

    // listener for test to make sure socket has connected
    socket.on('connection-name', () => {
      io.sockets.emit('new token', socket.decoded_token);
    });

    // when socket is disconnected remove player from the connections array
    socket.once('disconnect', () => {
      socket.leave();
      socket.disconnect();
    });

    socket.on('getPlayerInfo', ({ token }) => {
      const playerId = socket.decoded_token.id;
      getPlayerInfo(socket, playerId);
    });

    socket.on('getGameInfo', ({ gameId, token }) => {
      const playerId = socket.decoded_token.id;
      getGameInfo(socket, playerId, gameId);
    });

    /**
    * @param {String} payload. holds room name and username
    * @returns {Object} game room
    */
    // create and/or join a room
    socket.on('enterGameRoom', (payload) => {
      debug(payload);
      enterGameRoom(io, socket, payload);
    });

    /** @params {Number} gameId
     * add cards to the game board to being game
     * @returns {Object} game room
    */
    socket.on('startNewGame', (gameId) => {
      startNewGame(io, socket, gameId);
    });

    /** @params {Object} payload gameId and token
    */
    socket.on('isGameStarted', (payload) => {
      isGameStarted(socket, payload);
    });

    /* @params {Object} payload
    * return {Object} playerInfo, updatedDeck
    */
    socket.on('set', (payload) => {
      set(socket, payload);
    });

    // when a new client window is connected
    debug('Connected')
  });
}); // module.exports closing


  // DeckOfCards.findAll({
  //   where:{
  //     gameId: 12
  //   },
  //   order: ['cardOrder']
  // })
  // .then(deck => {
  //   debug(deck)
  // })

// remove association with deck
 // currentGame.removeCard(card.card)
           // currentGame.addCard(card.card, { cardOrder: index })
        // io.of('/').in(payload.roomName).clients(function(error, clients){
        //   if (error) throw error;
        //   debug("clients",clients);
        //   debug('room', socket.rooms)
        // });
