const router = require('express').Router();
const { shuffle } = require('lodash');
const debug = require('debug')('OH_GOSH');
const models = require('../models');
const createCards = require('../utils/createCards');

const Game = models.game;
const Card = models.card;

const getAllGames = (req, res) => {
  Game.findAll()
    .then(games => res.send(games))
    .catch(err => debug(err));
};

const getOneGameById = (req, res) => {
  Game.findById(req.params.id, { include: [{ all: true }] })
  .then(game => {
    res.send(game)
  })
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

const createGame = room => Game.create({ room })
  .then((game) => {
    createCards(game.id);
    return Game.findById(game.id, {
      include: [{
        model: Card,
      }],
    });
  })
  .then((game) => {
    const cards = game.get('cards');
    const currentCardOrder = [];
    for (let i = 0; i < cards.length; i += 1) {
      currentCardOrder.push(cards[i].id);
    }
    const shuffledCards = shuffle(currentCardOrder);
    game.updateAttributes({ cardOrder: shuffledCards });
    return game;
  });

const postRoom = (req, res) => {
  createGame(req.body.room);
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
  .post(postRoom);


module.exports = {
  router,
  getAllGames,
  getOneGameById,
  getOneGameByRoom,
  postRoom,
  createGame,
  deleteRoom,
  updateRoom,
};
