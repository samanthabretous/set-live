const db = require('../models');
const Player = require('../models').player;

Player.sync({force: true})
.then(() => db.sequelize.sync())
//add the following post to the database:
.then(() =>  Player.bulkCreate([
    {username: 'test1', email: 'test1@gmail.com', password: 'password1', matches: 2, wins: 0, loses: 5},
    {username: 'test2', email: 'test2@gmail.com', password: 'password2', matches: 8, wins: 3, loses: 0},
    {username: 'test3', email: 'test3@gmail.com', password: 'password3', matches: 5, wins: 4, loses: 2} 
  ], {validate: true})
)
.then(() =>{

  //find all of the newly created players and return the results
  //(if we try to immediately return the artists after bulkCreate, the ids may all show up as 'null')
  return Player.findAll()
})
.then((players)=>
  players.map(player => player.addGames([1]))
)