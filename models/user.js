const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema(
  {
    name: {
      required: [true, 'Обязательное поле'],
      type: String,
      minlength: [2, 'Минимальная длина поля - 2 знака'],
      maxlength: [30, 'Максимальная длина поля - 30 знаков'],
    },
    about: {
      required: [true, 'Обязательное поле'],
      type: String,
      minlength: [2, 'Минимальная длина поля - 2 знака'],
      maxlength: [30, 'Максимальная длина поля - 30 знаков'],
    },
    avatar: {
      type: String,
      validate: {
        validator: (v) => validator.isURL(v),
        message: 'Некорректный URL',
      },
      required: [true, 'Обязательное поле'],
    },
  },
  { versionKey: false },
);

module.exports = mongoose.model('user', userSchema);
