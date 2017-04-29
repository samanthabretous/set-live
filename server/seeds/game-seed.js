const db = require('../models');
const models = require('../models');
const { createGame } = require('../routes/game-router');

const Game = models.game;
const Card = models.card;

const gameSeed = () => {
  Game.sync({ force: true })
  .then(() => {
    Card.sync({ force: true });
  })
  .then(() => db.sequelize.sync())
  // add the following post to the database:
  .then(() => createGame('room1'))
  .then(() => Game.findOne({
    where: {
      room: 'room1',
    } }))
  .then(game => game.addPlayers([1, 2, 3, 4]));
};

gameSeed();

module.exports = gameSeed;
