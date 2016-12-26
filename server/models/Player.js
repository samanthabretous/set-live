'use strict';

const bcrypt = require('bcrypt-nodejs'),
      SALT_WORK_FACTOR = 12;

module.exports = function(sequelize, DataTypes) {
  var Player = sequelize.define('player', {
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false, 
      validate:{
        isEmail: true,
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [6,20], 
      }
    },
    matches: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    wins: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    loses: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    image: DataTypes.STRING,
    bio: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Player.belongsToMany(models.game, {through:"game_player"})
      },

      //check if password is valid
      validPassword: function(password, passwd, cb, player){
        bcrypt.compare(password, passwd, function(err, isMatch){
          if (err) console.log(err)
          if (isMatch) {
            return cb(null, player)
          } else {
            return cb(null, false)
          }
        })
      }
    },
    getterMethods: {
      fullName: function () {
        return `${this.first_name} ${this.last_name}`
      }
    }
  });

  //change the password player has enter into an encrypted password before entering into database
  Player.hook('beforeCreate', function(player, fn){
    var salt = bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt){
      return salt
    });
    player.password = bcrypt.hashSync(player.password, salt) 
    return fn

  })

  return Player;
};