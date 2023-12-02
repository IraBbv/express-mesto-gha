// require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { celebrate, Joi, errors } = require('celebrate');

const { login, createUser } = require('./controllers/users');
const urlRegEx = require('./utils/constants');
const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/error-handler');
const NotFoundError = require('./errors/not-found-error');

const { PORT = 3000 } = process.env;

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
});

const app = express();
app.use(cookieParser);

mongoose.connect('mongodb://0.0.0.0:27017/mestodb');

app.use(bodyParser.json());
app.use(helmet());
app.use(limiter);

app.post('/', (req, res) => {
  res.send('Hello, world!');
});

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(urlRegEx),
  }).unknown(true),
}), createUser);

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }).unknown(true),
}), login);

app.use(auth);
app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use('*', (req, res) => {
  res.send(new NotFoundError('Страница не найдена'));
});

app.use(errors());

app.use(errorHandler);

app.listen(PORT);
