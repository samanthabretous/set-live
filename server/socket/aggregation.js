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
  const { clickedCards, gameId } = payload;
  let game = null;
  let player = null;
  Game.findById(gameId, {
    include: Card,
  })
  .then((currentGame) => {
    game = currentGame;
    return currentGame.getCards();
  })
  .then(() => {
    _.map(clickedCards, (card) => {
      // remove association with game
      game.removeCard(card.card);
    });
    return Player.findById(socket.decoded_token.id);
  })
  .then((socketPlayer) => {
    player = socketPlayer;
    socketPlayer.increment('matches');
  })
  .then(() => game.getCards())
  .then((cards) => {
    io.sockets.in(game.room).emit('updateGame', { cards, playerSet: player.username });
  });
};


module.exports = {
  startGame,
  startNewGame,
  updateBoardLength,
  set,
};
