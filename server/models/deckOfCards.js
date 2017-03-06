module.exports = (sequelize, DataTypes) => {
  const DeckOfCards = sequelize.define('deck_of_cards', {
    cardOrder: {
      type: DataTypes.INTEGER,
    },
    location: {
      type: DataTypes.STRING,
      defaultValue: 'deck',
      validate: {
        isIn: [['deck', 'hand', 'dead']],
      },
    },
  });
  return DeckOfCards;
};

// user.addProject(project, { through: { status: 'started' }})

