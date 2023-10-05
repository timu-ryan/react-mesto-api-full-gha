const { celebrate, Joi } = require('celebrate');
const router = require('express').Router();
const userRoutes = require('./users');
const cardRoutes = require('./cards');
const auth = require('../middlewares/auth');
const {
  createUser,
  login,
} = require('../controllers/users');
const NotFoundError = require('../errors/not-found-err');
const linkRegEx = require('../utils/regularEspresions');

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

router.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(linkRegEx),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), createUser);

router.use('/users', userRoutes);
router.use('/cards', cardRoutes);
// router.use('/*', (req, res) => res.status(NOT_FOUND_ERROR_CODE)
// .send({ message: 'Запрашиваемая страница не найдена' }));
router.use('/*', auth, () => {
  throw new NotFoundError('Нет пользователя с таким id');
});

module.exports = router;
