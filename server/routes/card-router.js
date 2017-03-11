const router = require('express').Router();
const Card = require('../models').card;
const debug = require('debug')('OH_GOSH');

const getAllCards = (req, res) => {
  Card.findAll()
    .then(cards => res.send(cards))
    .catch(err => debug(err));
};

router.route('/')
  .get(getAllCards);


module.exports = {
  router,
};
