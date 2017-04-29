module.exports = (sequelize, DataTypes) => {
  const Card = sequelize.define('card', {
    card: {
      type: DataTypes.INTEGER,
    },
    number: DataTypes.INTEGER,
    color: DataTypes.STRING,
    shade: DataTypes.STRING,
    shape: DataTypes.STRING,
    location: {
      type: DataTypes.STRING,
      defaultValue: 'deck',
      validate: {
        isIn: [['deck', 'board', 'dead']],
      },
    },
  }, {
    classMethods: {
      associate: (models) => {
        // associations can be defined here
        Card.belongsTo(models.game);
      },
    },
    timestamps: false,
  });
  return Card;
};
