const jwt = require('jsonwebtoken');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(401).send({ message: 'Необхожимо авторизироваться' });
  }

  const token = authorization.replpace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, `${process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : 'Some-secret-key'}`);
  } catch (err) {
    return res.status(401).send({ message: 'Необхожимо авторизироваться' });
  }

  req.user = payload;

  next();
};
