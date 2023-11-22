const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://0.0.0.0:27017/mestodb');

app.use(bodyParser.json());
app.use(helmet());

app.use((req, res, next) => {
  req.user = {
    _id: '65562592b806a01417888288',
  };
  next();
});

app.use('/users', userRouter);
app.use('/cards', cardRouter);
app.post('/signin', userRouter.login);
app.post('/signup', userRouter.createUser);

app.use('*', (req, res) => {
  res.status(404).send({ message: 'Страница не найдена' });
});

app.listen(PORT);
