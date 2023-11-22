require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');

const { login, createUser } = require('./routes/users');
const auth = require('./middlewares/auth');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://0.0.0.0:27017/mestodb');

app.use(bodyParser.json());
app.use(helmet());

// app.use((req, res, next) => {
//   req.user = {
//     _id: '65562592b806a01417888288',
//   };
//   next();
// });

app.use('*', (req, res) => {
  res.status(404).send({ message: 'Страница не найдена' });
});

app.post('/signup', createUser);
app.post('/signin', login);

app.use(auth);
app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.listen(PORT);
