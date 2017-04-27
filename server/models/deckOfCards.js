module.exports = (sequelize, DataTypes) => {
  const DeckOfCards = sequelize.define('deck_of_cards', {
    cardOrder: {
      type: DataTypes.INTEGER,
    },
    // cardId: DataTypes.INTEGER,
    // gameId: DataTypes.INTEGER,
    location: {
      type: DataTypes.STRING,
      defaultValue: 'deck',
      validate: {
        isIn: [['deck', 'board', 'dead']],
      },
    },
  }, {
    classMethods: {
      associate(models) {
        // associations can be defined here
        DeckOfCards.hasMany(models.game);
        DeckOfCards.hasMany(models.card);
      },
    },
  });
  return DeckOfCards;
};

// user.addProject(project, { through: { status: 'started' }})
