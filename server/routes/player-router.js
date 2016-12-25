const router = require('express').Router()
const Player = require('../models').game
const debug = require('debug')('OH_GOSH')

const getAllPlayers = (req,res) =>{
  Player.findAll()
    .then(games => res.send(games))
    .catch(err => debug(err))
}

const getOnePlayerById = (req,res) => {
  Player.findById(req.params.id, {include: [{all:true}]})
  .then(game => res.send(game))
  .catch(err => debug(err))
}

const getOnePlayerByUsername = (req,res) =>{
  Player.findOne({
    where: {
      username: req.params.username
    },
    include: [{all:true}]
  })
  .then(game => res.send(game))
  .catch(err => debug(err))
}

const createPlayer = (req, res) => {
  Player.create({
    username: req.body.username, 
    first_name: req.body.firstname,
    last_name: req.body.lastname,
  })
  .then(game => game.addCards(range(1,82)))
  .then(game => res.send(game))
  .catch(err => debug(err))
}

const deletePlayer = (req, res) => {
  Player.destroy({
    where:{ id: req.params.id }
  })
  .then(()=>  Player.findAll() )
  .then( allPlayer => res.send(allPlayer) )
  .catch( err => debug(err) )
}

const updatePlayer = (req, res) => {
  Player.update(
    {
      board: req.body.board
    },
    {
      where:{
        id: req.params.id
      }
    }
  )
  .then((id)=> Player.findById(
      parseInt(id)), 
      {include: [{all:true}]}
    )
  .then(updatedPlayer => res.send(updatedPlayer))
}



router.route('/')
  .get(getAllPlayers)

router.route('/id/:id')
  .get(getOnePlayerById)
  .delete(deletePlayer)
  .put(updatePlayer)

router.route('/username/:username')
  .get(getOnePlayerByUsername)
  .post(createPlayer)



module.exports = {
  router, 
  getAllPlayers,
  getOnePlayerById,
  getOnePlayerByUsername,
  createPlayer,
  deletePlayer,
  updatePlayer
}