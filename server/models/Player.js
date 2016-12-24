'use strict';
module.exports = function(sequelize, DataTypes) {
  var Player = sequelize.define('player', {
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.BOOLEAN,
    matches: DataTypes.INTEGER,
    wins: DataTypes.INTEGER,
    loses: DataTypes.INTEGER,
    image: DataTypes.STRING,
    bio: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Player.belongsToMany(models.game, {through:"game_player"})
      }
    }
  });
  return Player;
};