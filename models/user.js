const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      validate: {
        validator: (v) => validator.isEmail(v),
        message: 'Введите почту',
      },
      required: [true, 'Обязательное поле'],
      unique: [true, 'Пользователь с такой почтой уже существует'],
    },
    password: {
      type: String,
      required: [true, 'Обязательное поле'],
      minlength: [8, 'Минимальная длина пароля - 8 знака'],
      select: false,
    },
    name: {
      type: String,
      defaul: 'Жак-Ив Кусто',
      minlength: [2, 'Минимальная длина поля - 2 знака'],
      maxlength: [30, 'Максимальная длина поля - 30 знаков'],
    },
    about: {
      type: String,
      defaul: 'Исследователь',
      minlength: [2, 'Минимальная длина поля - 2 знака'],
      maxlength: [30, 'Максимальная длина поля - 30 знаков'],
    },
    avatar: {
      type: String,
      validate: {
        validator: (v) => validator.isURL(v),
        message: 'Некорректный URL',
      },
      defaul: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    },
  },
  { versionKey: false },
);

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).seelct('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Неверные почта или пароль'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('Неверные почта или пароль'));
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
