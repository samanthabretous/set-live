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
        Game.hasMany(models.player);
        Game.hasMany(models.player, { as: 'currentPlayer' });
        Game.hasMany(models.card);
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
