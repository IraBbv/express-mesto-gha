const mongoose = require('mongoose');
const urlRegEx = require('../utils/constants');

const cardSchema = new mongoose.Schema(
  {
    name: {
      required: [true, 'Обязательное поле'],
      type: String,
      minlength: [2, 'Минимальная длина поля - 2 знака'],
      maxlength: [30, 'Максимальная длина поля - 30 знаков'],
    },
    link: {
      type: String,
      validate: {
        validator: (v) => urlRegEx.test(v),
        message: 'Некорректный URL',
      },
      required: [true, 'Обязательное поле'],
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
  },
  { versionKey: false },
);

module.exports = mongoose.model('card', cardSchema);
