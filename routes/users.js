const Router = require('express').Router();
const {
  getAllUsers,
  getUser,
  createUser,
  updateUserInfo,
  updateUserAvatar,
} = require('../controllers/users');

Router.get('/', getAllUsers);
Router.get('/:userId', getUser);
Router.post('/', createUser);
Router.patch('/me', updateUserInfo);
Router.patch('/me/avatar', updateUserAvatar);

module.exports = Router;
