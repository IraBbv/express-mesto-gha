const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    required: [true, 'Обязательное поле'],
    type: String,
    minlength: [2, 'Минимальная длина поля - 2 знака'],
    maxlength: [30, 'Максимальная длина поля - 30 знаков'],
  },
  link: {
    required: [true, 'Обязательное поле'],
    type: String,
  },
  owner: {
    required: [true, 'Обязательное поле'],
    type: mongoose.Types.ObjectId,
    ref: 'user',
  },
  likes: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'user',
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
