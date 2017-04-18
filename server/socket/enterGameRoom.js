const _ = require('lodash');
const models = require('../models');

const Player = models.player;
const Game = models.game;

const enterGameRoom = (io, socket, payload) => {
  // find player in database and save
  let socketPlayer = null;
  Player.findOne({
    where: {
      username: payload.username,
    },
  })
  .then((foundPlayer) => {
    // save the player to be used later in the Promise chain
    socketPlayer = foundPlayer;
    // see if room exist in the database
    return Game.findOne({
      where: {
        room: payload.roomName,
      },
      include: Player,
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
    const playersInGame = game.get('players') ? game.get('players').length : 0;
    const maxPlayers = game.get('maxPlayers');

    // make sure there is space left in the game
    if (playersInGame < maxPlayers) {
      // add player to room and let other players in room know there is a new player
      game.addPlayers([socketPlayer.id]);

      const allPlayers = game.get('players') ? game.get('players').concat(socketPlayer) : socketPlayer;

      socket.join(payload.roomName);
      io.sockets.in(payload.roomName).emit('addPlayer', socketPlayer);

      // send a message to player and let them know how many more people they can invite
      socket.emit('goToGame', { game, players: allPlayers });

      // add card randomly to deck
      const shuffledNumbers = _.shuffle(_.range(1, 82));
      _.map(shuffledNumbers, (number, index) => {
        // add the first 12 cards to the board and the rest to the deck
        if (index > 12) {
          game.addCards(number, { cardOrder: index, status: 'board' });
        } else {
          game.addCards(number, { cardOrder: index, status: 'deck' });
        }

        return game;
      });
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
