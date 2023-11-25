const Router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const urlRegEx = require('../utils/constants');
const {
  getAllCards,
  createCard,
  deleteCard,
  addLike,
  removeLike,
} = require('../controllers/cards');

Router.get('/', getAllCards);

Router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(urlRegEx),
  }),
}), createCard);

Router.delete('/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().length(24).hex(),
  }),
}), deleteCard);

Router.put('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().length(24).hex(),
  }),
}), addLike);

Router.delete('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().length(24).hex(),
  }),
}), removeLike);

module.exports = Router;
