'use strict';
module.exports = function(sequelize, DataTypes) {
  const DeckOfCards = sequelize.define('deck_of_cards', {
    cardOrder: DataTypes.INTEGER,
    status: DataTypes.STRING
  });
  return DeckOfCards;
};

//user.addProject(project, { through: { status: 'started' }})

