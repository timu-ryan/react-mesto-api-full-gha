const jwt = require('jsonwebtoken');
// const { AUTHORIZATION_ERROR_CODE } = require('../errors/errror-codes');
const UnauthorizedError = require('../errors/unauthorized-err');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  const {
    NODE_ENV = 'production',
    JWT_SECRET = 'not-dev-secret',
  } = process.env;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    // return res
    //   .status(401)
    //   .send({ message: 'Необходима авторизация' });
    throw new UnauthorizedError('Неправильные почта или пароль');
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
    );
  } catch (err) {
    // return res
    //   .status(AUTHORIZATION_ERROR_CODE)
    //   .send({ message: 'Необходима авторизация' });
    next(new UnauthorizedError('Неправильные почта или пароль'));
  }

  req.user = payload;

  next();
};
