const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const urlRegEx = require('../utils/constants');

const LoginError = require('../errors/login-error');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      validate: {
        validator: (v) => validator.isEmail(v),
        message: 'Введите корректную почту',
      },
      required: [true, 'Обязательное поле'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Обязательное поле'],
      select: false,
    },
    name: {
      type: String,
      default: 'Жак-Ив Кусто',
      minlength: [2, 'Минимальная длина поля - 2 знака'],
      maxlength: [30, 'Максимальная длина поля - 30 знаков'],
    },
    about: {
      type: String,
      default: 'Исследователь',
      minlength: [2, 'Минимальная длина поля - 2 знака'],
      maxlength: [30, 'Максимальная длина поля - 30 знаков'],
    },
    avatar: {
      type: String,
      validate: {
        validator: (v) => urlRegEx.test(v),
        message: 'Некорректный URL',
      },
      default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    },
  },
  { versionKey: false },
);

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new LoginError('Неверные почта или пароль');
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new LoginError('Неверные почта или пароль');
          }

          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
