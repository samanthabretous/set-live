const router = require('express').Router();
const { shuffle, range } = require('lodash');
const debug = require('debug')('OH_GOSH');
const models = require('../models');
const createCards = require('../utils/createCards');

const Game = models.game;

const getOneGameById = (req, res) => {
  Game.findById(req.params.id, {
    include: [
      {
        model: models.card,
        where: {
          location: 'deck',
        },
      },
      {
        model: models.player,
        exclude: ['password'],
      },
    ],
    order: [[models.card, 'cardOrder', 'ASC']],
  })
  .then((game) => {
    res.send(game);
  })
  .catch(err => debug(err));
};

const createGame = (room) => Game.create({ room })
  .then((game) => {
    createCards(game.id, shuffle(range(1, 82)));
    return Game.findById(game.id, {
      include: [
        {
          model: models.card,
        },
        {
          model: models.player,
          exclude: ['password'],
        },
      ],
      order: [[models.card, 'cardOrder', 'ASC']],
    });
  });

const postRoom = (req) => {
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

router.route('/id/:id')
  .get(getOneGameById)
  .delete(deleteRoom)

router.route('/room/:room')
  .post(postRoom);


module.exports = {
  router,
  createGame,
};
