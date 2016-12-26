const player = require('./player-router').router
const game = require('./game-router').router
const card = require('./card-router').router
const api = require('./api-router').router

module.exports = {
  player, 
  game,
  card,
  api
}