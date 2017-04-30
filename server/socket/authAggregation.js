const models = require('../models');

const Player = models.player;
const Card = models.card;
const Game = models.game;

const getPlayerInfo = (socket, playerId) => {
  Player.findById(playerId)
  .then((player) => {
    if (!player) {
      socket.emit('receivePlayerInfo', { success: false, msg: 'Authentication failed. Player not found.' });
    } else {
      socket.emit('receivePlayerInfo', { success: true, msg: `Welcome in the member area ${player.username}!`, playerInfo: player });
    }
  });
};

const getGameInfo = (socket, playerId, gameId) => {
  Game.findById(gameId, {
    include: [
      {
        model: Card,
        where: {
          location: 'deck',
        },
      },
      {
        model: Player,
        exclude: ['password'],
      },
      {
        model: Player,
        as: 'currentPlayer',
        exclude: ['password'],
        where: {
          id: playerId,
        },
      },
    ],
    order: [[models.card, 'cardOrder', 'ASC']],
  })
  .then((game) => {
    if (!game) {
      socket.emit('receivePlayerInfo', { success: false, msg: 'Authentication failed. Player not found.' });
    } else {
      socket.join(game.get('room'));
      socket.emit('receiveGameInfo', { success: true, msg: `Welcome in the member area!`, game });
    }
  });
};

module.exports = {
  getPlayerInfo,
  getGameInfo,
};
