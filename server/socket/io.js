const _ = require('lodash');
const socketioJwt = require('socketio-jwt');
const debug = require('debug')('SOCKET');
const { startGame, startNewGame, updateBoardLength, set } = require('./aggregation');
const { getPlayerInfo, getGameInfo } = require('./authAggregation');
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
    socket.on('startGame', ({ gameId, room }) => {
      startGame(io, socket, gameId, room);
    });

    socket.on('startNewGame', ({ room }) => {
      startNewGame(io, socket, room);
    });

    socket.on('updateBoardLength', ({ room, gameId }) => {
      updateBoardLength(io, socket, gameId, room);
    });

    /* @params {Object} clickedCards, gameId, room
    * return {Object} playerInfo, updatedDeck
    */
    socket.on('set', (payload) => {
      set(io, socket, payload);
    });

    // when a new client window is connected
    debug('Connected')
  });
}); // module.exports closing
