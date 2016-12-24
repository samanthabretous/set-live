'use strict';
module.exports = function(sequelize, DataTypes) {
  var Deck = sequelize.define('deck', {
    deckNumber: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Deck.hasMany(models.card)
      }
    }
  });
  return Deck;
};