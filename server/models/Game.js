'use strict';
module.exports = function(sequelize, DataTypes) {
  var Game = sequelize.define('game', {
    room: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    board: DataTypes.ARRAY(DataTypes.BOOLEAN),
    started: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    maxPlayers: {
      type: DataTypes.INTEGER, 
      defaultValue: 6
    },
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Game.belongsToMany(models.card, {through: 'deck_of_cards'})
        Game.belongsToMany(models.player, {through:"game_player"})
      },
      createGame: function(room, board) {
        return this.build({
          room,
          board
        })
      }
    }
  });
  return Game;
};