const router = require('express').Router();
const debug = require('debug')('OH_GOSH');
const Game = require('../models').game;

const getAllGames = (req, res) => {
  Game.findAll()
    .then(games => res.send(games))
    .catch(err => debug(err));
};

const getOneGameById = (req, res) => {
  Game.findById(req.params.id, { include: [{ all: true }] })
  .then(game => res.send(game))
  .catch(err => debug(err));
};

const getOneGameByRoom = (req, res) => {
  Game.findOne({
    where: {
      room: req.params.room,
    },
    include: [{ all: true }],
  })
  .then(game => res.send(game))
  .catch(err => debug(err));
};

const createRoom = (req, res) => {
  Game.create({
    room: req.body.room,
    board: req.body.board,
  })
  .then(game => game.addCards(range(1, 82)))
  .then(game => res.send(game))
  .catch(err => debug(err));
};

const deleteRoom = (req, res) => {
  Game.destroy({
    where: { id: req.params.id },
  })
  .then(() => Game.findAll())
  .then(allGame => res.send(allGame))
  .catch(err => debug(err));
};

const updateRoom = (req, res) => {
  Game.update(
    {
      board: req.body.board,
    },
    {
      where: {
        id: req.params.id,
      },
    })
  .then(id => Game.findById(
    parseInt(id)),
    { include: [{ all: true }] })
  .then(updatedGame => res.send(updatedGame));
};

router.route('/')
  .get(getAllGames);

router.route('/id/:id')
  .get(getOneGameById)
  .delete(deleteRoom)
  .put(updateRoom);

router.route('/room/:room')
  .get(getOneGameByRoom)
  .post(createRoom);


module.exports = {
  router,
  getAllGames,
  getOneGameById,
  getOneGameByRoom,
  createRoom,
  deleteRoom,
  updateRoom,
};
