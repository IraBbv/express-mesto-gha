const Card = require('../models/card');

module.exports.getAllCards = (req, res) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => res.send(cards))
    .catch(() => res.status(500).send({ message: 'На сервере произошла ошибка' }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: `Переданы некорректные данные: ${err.message}` });
      } else {
        res.status(500).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

module.exports.deleteCard = (req, res) => {
  if (req.params.cardId.length === 24) {
    Card.findByIdAndDelete(req.params.cardId)
      .then((card) => {
        if (!card) {
          res.status(404).send({ message: 'Карточка с указанным id не найдена' });
          return;
        }
        res.status(200).send({ message: 'Successfully removed' });
      })
      .catch(() => res.status(404).send({ message: 'Карточка с указанным id не найдена' }));
  } else {
    res.status(400).send({ message: 'Некорректный id карточки' });
  }
};

module.exports.addLike = (req, res) => {
  if (req.params.cardId.length === 24) {
    Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    )
      .populate(['owner', 'likes'])
      .then((card) => {
        if (!card) {
          res.status(404).send({ message: 'Карточка с указанным id не найдена' });
          return;
        }
        res.status(200).send(card);
      })
      .catch(() => res.status(404).send({ message: 'Карточка с указанным id не найдена' }));
  } else {
    res.status(400).send({ message: 'Некорректный id карточки' });
  }
};

module.exports.removeLike = (req, res) => {
  if (req.params.cardId.length === 24) {
    Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    )
      .populate(['owner', 'likes'])
      .then((card) => {
        if (!card) {
          res.status(404).send({ message: 'Карточка с указанным id не найдена' });
          return;
        }
        res.status(200).send(card);
      })
      .catch(() => res.status(404).send({ message: 'Карточка с указанным id не найдена' }));
  } else {
    res.status(400).send({ message: 'Некорректный id карточки' });
  }
};
