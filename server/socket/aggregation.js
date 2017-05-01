const _ = require('lodash');
const models = require('../models');

const Player = models.player;
const Card = models.card;
const Game = models.game;

const startGame = (io, socket, gameId, room) => {
  Game.update({
    started: true,
  }, {
    where: {
      id: gameId,
    },
  })
  .then(() => {
    io.sockets.in(room).emit('gameStarted');
  });
};

// create a whole new game within the room
const startNewGame = (io, sockets, room) => {

};

const updateBoardLength = (io, socket, gameId, room, currentBoardLength) => {
  const boardLength = currentBoardLength === 15 ? 12 : 15;
  Game.update({
    boardLength,
  }, {
    where: {
      id: gameId,
    },
  })
  .then(() => {
    if (boardLength === 15) {
      io.sockets.in(room).emit('addMoreCardsToBoard', { boardLength });
    }
  });
};

const set = (io, socket, payload) => {
  const { clickedCards, gameId, room } = payload;
  let cards = null;
  Card.update({
    location: 'dead',
  }, {
    where: {
      $or: [
        { id: clickedCards[0].id },
        { id: clickedCards[1].id },
        { id: clickedCards[2].id },
      ],
    },
  })
  .then(() => {
    Game.update({
      boardLength: 12,
    }, {
      where: { id: gameId },
    });
    return Card.findAll({
      where: {
        gameId,
        location: 'deck',
      },
      order: [['cardOrder', 'ASC']],
    });
  })
  .then((deck) => {
    cards = deck;
    return Player.findById(socket.decoded_token.id);
  })
  .then((player) => {
    io.sockets.in(room).emit('updateCards', { cards, playerSet: player.username });
  })
  .catch(err => console.log(err));
};


module.exports = {
  startGame,
  startNewGame,
  updateBoardLength,
  set,
};
