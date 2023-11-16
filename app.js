const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://0.0.0.0:27017/mestodb');

app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ estended: true }));

// app.get('/', (req, res) => {
//   res.status(200).send({ message: 'Hello, World!' });
// });

app.use((req, res, next) => {
  req.user = {
    _id: '65562592b806a01417888288',
  };
  next();
});

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.listen(PORT);
