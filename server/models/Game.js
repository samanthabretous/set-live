module.exports = (sequelize, DataTypes) => {
  const Game = sequelize.define('game', {
    room: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    started: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    maxPlayers: {
      type: DataTypes.INTEGER,
      defaultValue: 6,
    },
  }, {
    classMethods: {
      associate: (models) => {
        // associations can be defined here
        Game.belongsToMany(models.card, { through: 'deck_of_cards' });
        Game.hasMany(models.player);
      },
      createGame: (room, board) => (
        this.build({
          room,
          board,
        })
      ),
    },
  });
  return Game;
};
