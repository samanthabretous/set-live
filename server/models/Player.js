'use strict';
module.exports = function(sequelize, DataTypes) {
  var Player = sequelize.define('player', {
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false, 
      validate:{
        isEmail: true,
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [6,20], 
      }
    },
    matches: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    wins: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    loses: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    image: DataTypes.STRING,
    bio: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Player.belongsToMany(models.game, {through:"game_player"})
      }
    },
    getterMethods: {
      fullName: function () {
        return `${this.first_name} ${this.last_name}`
      }
    }
  });
  return Player;
};