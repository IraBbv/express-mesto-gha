const jwt = require('jsonwebtoken');
const AuthorizationError = require('../errors/authorization-error');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new AuthorizationError('Необходимо авторизироваться.');
  }

  const token = req.cookies.jwt;
  let payload;

  try {
    payload = jwt.verify(token, '984ce1be708307d41857f5c4f295e5dab0800543ac7ca3b796940b30d4adc7e8');
  } catch (err) {
    throw new AuthorizationError('Необходимо авторизироваться.');
  }

  req.user = payload;

  next();
};
