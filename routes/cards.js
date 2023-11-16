const Router = require('express').Router();
const {
  getAllCards,
  createCard,
  deleteCard,
  addLike,
  removeLike,
} = require('../controllers/cards');

Router.get('/', getAllCards);
Router.post('/', createCard);
Router.delete('/:cardId', deleteCard);
Router.put('/:cardId/likes', addLike);
Router.delete('/:cardId/likes', removeLike);

module.exports = Router;
