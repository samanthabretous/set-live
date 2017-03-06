module.exports = (sequelize, DataTypes) => {
  const Card = sequelize.define('card', {
    card: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    number: DataTypes.INTEGER,
    color: DataTypes.STRING,
    shade: DataTypes.STRING,
    shape: DataTypes.STRING,
  }, {
    classMethods: {
      associate: (models) => {
        // associations can be defined here
        Card.belongsToMany(models.game, { through: 'deck_of_cards' });
      },
    },
    timestamps: false,
  });
  return Card;
};
