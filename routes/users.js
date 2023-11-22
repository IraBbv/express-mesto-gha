const Router = require('express').Router();
const {
  getAllUsers,
  getUser,
  updateUserInfo,
  updateUserAvatar,
  getCurrentUser,
} = require('../controllers/users');

Router.get('/', getAllUsers);
Router.get('/:userId', getUser);
Router.get('/me', getCurrentUser);
Router.patch('/me', updateUserInfo);
Router.patch('/me/avatar', updateUserAvatar);

module.exports = Router;
