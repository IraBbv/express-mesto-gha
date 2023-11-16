const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
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
    required: [true, 'Обязательное поле'],
    type: String,
  },
});

module.exports = mongoose.model('user', userSchema);
