'use strict';
module.exports = function(sequelize, DataTypes) {
  var DeckOfCards = sequelize.define('deck_of_cards', {
    cardOrder: DataTypes.INTEGER
  });
  return DeckOfCards;
};

//user.addProject(project, { through: { status: 'started' }})

