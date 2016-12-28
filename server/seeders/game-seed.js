const db = require('../models');
const Game = require('../models').game;
const range = require('lodash').range;

Game.sync({force: true})
.then(() => db.sequelize.sync())
//add the following post to the database:
.then(() => {
  return Game.create({room:'room1', board:[false, false, false]})
})
.then( game => {

  //add all cards to the deck
  game.addCards(range(1,82))
  game.addPlayers([1])
})