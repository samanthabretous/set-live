const _ = require('lodash');
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
      socket.emit('receiveGameInfo', { success: true, msg: `Welcome in the member area!`, game });
    }
  });
}

const startNewGame = (io, socket, gameId) => {
  let currentGame = null;
  Game.findOne({
    where: {
      id: gameId,
    },
    include: [
      {
        model: Card,
      },
      {
        model: DeckOfCards,
        where: {
          location: 'board',
        },
        order: 'cardOrder',
      },
    ],
  })
  .then((game) => {
    console.log('============');
    console.log('============');
    console.log('============');
    console.log(game);
    socket.join(game.room);
    game.update({ started: true });
    currentGame = game;
    return game.getCards();
  })
  .then((cards) => {
    io.sockets.in(currentGame.room).emit('gameStarted', cards);
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

const isGameStarted = (socket, payload) => {
  let game = null;
  let cards = null;
  let players = null;
  const { gameId, token } = payload;

  Game.findById(gameId, { include: [Card, Player] })
  .then((currentGame) => {
    socket.join(currentGame.room);
    game = currentGame;
    return currentGame.getCards();
  })
  .then((gameCards) => {
    cards = gameCards;
    return game.get('players');
  })
  .then((allPlayers) => {
    players = allPlayers;
    return game.get('started');
  })
  .then((started) => {
    if (started) {
      socket.emit('reloadGame', { cards, players, game, started });
    } else {
      socket.emit('goToGame', { game, players });
    }
  });
};

module.exports = {
  getPlayerInfo,
  getGameInfo,
  startNewGame,
  isGameStarted,
  set,
};
