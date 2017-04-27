const db = require('../models');
const Player = require('../models').player;

const playerSeed = () => {
  Player.sync({ force: true })
  .then(() => db.sequelize.sync())
  // add the following post to the database:
  .then(() => Player.create({ username: 'test1', email: 'test1@gmail.com', password: 'password1', matches: 2, wins: 0, loses: 5 }))
  .then(() => Player.create({ username: 'test2', email: 'test2@gmail.com', password: 'password2', matches: 8, wins: 3, loses: 0 }))
  .then(() => Player.create({ username: 'test3', email: 'test3@gmail.com', password: 'password3', matches: 5, wins: 4, loses: 2 }))
  .then(() => Player.create({ username: 'admin', email: 'admin@gmail.com', password: 'admin123', matches: 5, wins: 4, loses: 2 }));
};

playerSeed();

module.exports = playerSeed;
