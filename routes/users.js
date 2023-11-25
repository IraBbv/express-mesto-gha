const Router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const urlRegEx = require('../utils/constants');
const {
  getAllUsers,
  getUser,
  updateUserInfo,
  updateUserAvatar,
  getCurrentUser,
} = require('../controllers/users');

Router.get('/', getAllUsers);
Router.get('/me', getCurrentUser);

Router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().length(24).hex(),
  }),
}), getUser);

Router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateUserInfo);

Router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(urlRegEx),
  }),
}), updateUserAvatar);

module.exports = Router;
