'use strict';
module.exports = function(sequelize, DataTypes) {
  var Game = sequelize.define('game', {
    room: DataTypes.STRING,
    board: DataTypes.ARRAY(DataTypes.BOOLEAN),
    //cards: DataTypes.ARRAY(DataTypes.BOOLEAN),
    started: DataTypes.BOOLEAN,
    maxPlayers: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Game.hasOne(models.deck)
        Game.belongsToMany(models.player, {through:"game_player"})
      }
    }
  });
  return Game;
};