const Router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const urlRegEx = require('../utils/constants');
const createUser = require('../controllers/users');

Router.post('/', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(urlRegEx),
  }).unknown(true),
}), createUser);
