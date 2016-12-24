'use strict';
module.exports = function(sequelize, DataTypes) {
  var Card = sequelize.define('card', {
    card: DataTypes.INTEGER,
    number: DataTypes.INTEGER,
    color: DataTypes.STRING,
    shade: DataTypes.STRING,
    shape: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Card;
};