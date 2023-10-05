const { celebrate, Joi } = require('celebrate');
const router = require('express').Router();
const auth = require('../middlewares/auth');
const {
  getUsers,
  getUserById,
  updateProfile,
  updateAvatar,
  getMyProfile,
} = require('../controllers/users');
const linkRegEx = require('../utils/regularEspresions');

router.get('/', auth, getUsers);

router.get('/me', auth, getMyProfile);

router.get('/:userId', auth, celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().hex().length(24),
  }),
}), getUserById);

router.patch('/me', auth, celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateProfile);

router.patch('/me/avatar', auth, celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().regex(linkRegEx),
  }),
}), updateAvatar);

module.exports = router;
