const db = require('../models');
const Game = require('../models').game;
const range = require('lodash').range;

Game.sync({force: true})
.then(() => db.sequelize.sync())
//add the following post to the database:
.then(() => {
  return Game.create({room:'room1'})
})
.then( game => {

  game.addPlayers([1])
  //add all cards to the deck
  game.addCards(range(1,82), {cardOrder: 100})
})
.then(() => {
  return Game.create({room:'room2'})
})
.then( game => {
  game.addPlayers([1,2,3,4])
  //add all cards to the deck
  game.addCards(range(1,82), {cardOrder: 100})
})
.then(() => {
  return Game.create({room:'room3'})
})
.then( game => {
  game.addPlayers([1,2,3,4])
  //add all cards to the deck
  game.addCards(range(1,82), {cardOrder: 100})
})