const Card = require('../models/Card');
const {
  SUCCESS_CODE,
  CREATED_CODE,
  // INCORRECT_DATA_ERROR_CODE,
  // NOT_FOUND_ERROR_CODE,
  // SERVER_ERROR_CODE,
} = require('../errors/errror-codes');
const NotFoundError = require('../errors/not-found-err');
const InternalServerError = require('../errors/internal-server-err');
const BadRequest = require('../errors/bad-request');
const NoRights = require('../errors/no-rights-err');

const createCard = (req, res, next) => {
  const newCardData = req.body;
  newCardData.owner = req.user._id;
  return Card.create(newCardData)
    .then((newCard) => res.status(CREATED_CODE).send(newCard))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        // return res.status(INCORRECT_DATA_ERROR_CODE).send({
        //   message: `${Object.values(err.errors).map((e) => e.message).join(', ')}`,
        // });
        // next(new BadRequest(`${Object.values(err.errors).map((e) => e.message).join(', ')}`));
        next(new BadRequest('invalid data'));
      } else {
        next(err);
      }
      // return res.status(SERVER_ERROR_CODE).send({ message: 'Server Error' });
      // next(new InternalServerError('Server Error'));
    });
};

const getCards = (req, res, next) => Card.find({})
  .then((cards) => res.status(SUCCESS_CODE).send(cards))
  .catch(() => next(new InternalServerError('Server Error')));

const deleteCardById = (req, res, next) => {
  const { cardId } = req.params;
  return Card.findById(cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Card not found');
      }
      if (!card.owner.equals(req.user._id)) {
        throw new NoRights('нет прав для удаления карточки');
      }
      card.deleteOne()
        .then(() => res.status(SUCCESS_CODE).send({ message: 'карточка удалена' }))
        .catch(next);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest('invalid data'));
      } else {
        next(err);
      }
    });
};

const putLike = (req, res, next) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
  { new: true },
)
  .then((card) => {
    if (!card) {
      // return res.status(NOT_FOUND_ERROR_CODE).send({ message: 'Card not found' });
      throw new NotFoundError('Card not found');
    }
    return res.status(SUCCESS_CODE).send(card);
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      // return res.status(INCORRECT_DATA_ERROR_CODE).send({ message: 'invalid data' });
      next(new BadRequest('invalid data'));
    } else {
      next(err);
    }
    // return res.status(SERVER_ERROR_CODE).send({ message: 'Server Error' });
    // next(new InternalServerError('Server Error'));
  });

const deleteLike = (req, res, next) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } }, // убрать _id из массива
  { new: true },
)
  .then((card) => {
    if (!card) {
      // return res.status(NOT_FOUND_ERROR_CODE).send({ message: 'Card not found' });
      throw new NotFoundError('Card not found');
    }
    return res.status(SUCCESS_CODE).send(card);
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      // return res.status(INCORRECT_DATA_ERROR_CODE).send({ message: 'invalid data' });
      next(new BadRequest('invalid data'));
    } else {
      next(err);
    }
    // return res.status(SERVER_ERROR_CODE).send({ message: 'Server Error' });
    // next(new InternalServerError('Server Error'));
  });

module.exports = {
  createCard, getCards, deleteCardById, putLike, deleteLike,
};
