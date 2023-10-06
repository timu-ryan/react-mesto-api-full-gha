require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const {
  SUCCESS_CODE,
  CREATED_CODE,
  // INCORRECT_DATA_ERROR_CODE,
  // NOT_FOUND_ERROR_CODE,
  // SERVER_ERROR_CODE,
  // AUTHORIZATION_ERROR_CODE,
} = require('../errors/errror-codes');
// const { UnauthorizedError } = require('../errors/bad-request');
const NotFoundError = require('../errors/not-found-err');
const InternalServerError = require('../errors/internal-server-err');
const ConflictError = require('../errors/conflict-err');
const BadRequest = require('../errors/bad-request');

const { NODE_ENV = 'production', JWT_SECRET = 'dev-secret' } = process.env;

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );

      res
        .status(SUCCESS_CODE)
        // .cookie('jwt', token, { httpOnly: true })
        .send({ token });
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const newUserData = req.body;
  bcrypt.hash(newUserData.password, 10)
    .then((hash) => User.create({ ...newUserData, password: hash }))
    .then(({
      name, about, avatar, email,
    }) => res.status(CREATED_CODE).send({
      name, about, avatar, email,
    }))
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError('Пользователь с таким email уже существует'));
      } else if (err.name === 'ValidationError') {
        // return res.status(INCORRECT_DATA_ERROR_CODE).send({
        //   message: `${Object.values(err.errors).map((e) => e.message).join(', ')}`,
        // });
        // next(new BadRequest(`${Object.values(err.errors).map((e) => e.message).join(', ')}`));
        next(new BadRequest('invalid data'));
      } else {
        next(err);
      }
      // return res.status(SERVER_ERROR_CODE).send({ message: 'Server Error' });
      // next(new InternalServerError('Server error'));
    });
};

const getUsers = (req, res, next) => User.find({})
  .then((users) => res.status(SUCCESS_CODE).send(users))
  .catch(next);
  // .catch(() => next(new InternalServerError('Server Error')));

const getUserById = (req, res, next) => {
  const { userId } = req.params;

  return User.findById(userId)
    .then((user) => {
      if (!user) {
        // return res.status(NOT_FOUND_ERROR_CODE)
        //   .send({ message: 'Запрашиваемый пользователь не найден' });
        throw new NotFoundError('Запрашиваемый пользователь не найден');
      }
      return res.status(SUCCESS_CODE).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        // return res.status(INCORRECT_DATA_ERROR_CODE).send({ message: 'invalid data' });
        next(new BadRequest('invalid data'));
      } else {
        next(err);
      }
      // return res.status(SERVER_ERROR_CODE).send({ message: 'Server Error' });
      // next(new InternalServerError('Server error'));
    });
};

const getMyProfile = (req, res, next) => User.findById(req.user._id)
  .then((myProfile) => res.status(SUCCESS_CODE).send(myProfile))
  .catch(() => next(new InternalServerError('Server Error')));

const updateProfile = (req, res, next) => {
  User.findByIdAndUpdate(req.user._id, req.body, { new: true })
    .then((user) => {
      if (!user) {
        // return res.status(NOT_FOUND_ERROR_CODE)
        //   .send({ message: 'Запрашиваемый пользователь не найден' });
        throw new NotFoundError('Запрашиваемый пользователь не найден');
      }
      return res.status(SUCCESS_CODE).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        // return res.status(INCORRECT_DATA_ERROR_CODE).send({ message: 'invalid data' });
        next(new BadRequest('invalid data'));
      } else {
        next(err);
      }
      // return res.status(SERVER_ERROR_CODE).send({ message: 'Server Error' });
      // next(new InternalServerError('Server error'));
    });
};

const updateAvatar = (req, res, next) => {
  User.findByIdAndUpdate(req.user._id, req.body, { new: true })
    .then((user) => {
      if (!user) {
        // return res.status(NOT_FOUND_ERROR_CODE)
        //  .send({ message: 'Запрашиваемый пользователь не найден' });
        throw new NotFoundError('Запрашиваемый пользователь не найден');
      }
      return res.status(SUCCESS_CODE).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        // return res.status(INCORRECT_DATA_ERROR_CODE).send({ message: 'invalid data' });
        next(new BadRequest('invalid data'));
      } else {
        next(err);
      }
      // return res.status(SERVER_ERROR_CODE).send({ message: 'Server Error' });
      // next(new InternalServerError('Server error'));
    });
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateProfile,
  updateAvatar,
  login,
  getMyProfile,
};
