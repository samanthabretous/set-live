const _ = require('lodash');
const models = require('../models');

const Player = models.player;
const Game = models.game;

const createNewDeck = (game) => {
  const shuffledNumbers = _.shuffle(_.range(1, 82));
  _.map(shuffledNumbers, (number, index) => {
    // add the first 12 cards to the board and the rest to the deck
    if (index > 12) {
      game.addCards(number, { cardOrder: index, location: 'board' });
    } else {
      game.addCards(number, { cardOrder: index, location: 'deck' });
    }

    return game;
  });
};
const enterGameRoom = (io, socket, payload) => {
  // find player in database
  let socketPlayer = null;
  Player.findOne({
    where: {
      username: payload.username,
    },
  })
  .then((foundPlayer) => {
    // save the player to be used later in the Promise chain
    socketPlayer = foundPlayer;
    // see if room user entered exist in the database
    return Game.findOne({
      where: {
        room: payload.roomName,
      },
      exclude: ['createdAt', 'updatedAt'],
      include: [{
        model: Player,
        exclude: ['password'],
      }],
    });
  })
  .then((game) => {
    if (!game) {
      // game does not exist already then
      return Game.create({
        room: payload.roomName,
      });
    } else {
      return game;
    }
  })
  .then((game) => {
    // handle if game was recently created
    const playersInGame = game.get('players');
    const playersInGameTotal = playersInGame ? game.get('players').length : 0;
    const maxPlayers = game.get('maxPlayers');
    // make sure there is space left in the game
    if (playersInGameTotal < maxPlayers) {
      // add player to room and let other players in room know there is a new player
      game.addPlayers([socketPlayer.id]);

      const allPlayers = playersInGameTotal ? game.get('players').concat(socketPlayer) : [socketPlayer];

      socket.join(payload.roomName);
      io.sockets.in(payload.roomName).emit('addPlayer', socketPlayer);

      // send a message to player and let them know how many more people they can invite
      socket.emit('goToGame', { game, players: allPlayers });

      // add cards randomly to deck. make deck now due to timing
      createNewDeck(game);
    } else {
      // if room is full. tell player
      socket.emit('roomFull', true);
    }
  })
  .catch((err) => {
    console.log(err);
  });
};

module.exports = {
  enterGameRoom,
};