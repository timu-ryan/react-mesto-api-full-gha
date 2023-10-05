const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const routes = require('./routes/index');
const { errorCatchMiddleware } = require('./middlewares/catchErrors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
// const { authMiddleware } = require('./middlewares/authMid');

const { PORT = 3000 } = process.env;
const allowedCors = [
  'https://praktikum.tk',
  'http://praktikum.tk',
  'localhost:3000',
];
mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
}).then(() => {
  console.log('connected to db');
});

const app = express();
// app.use((req, res, next) => {
//   req.user = {
//     _id: '65134af009b09b109914f5c9',
//   };
//   next();
// });

app.use((req, res, next) => {
  const { origin } = req.headers; // Сохраняем источник запроса в переменную origin
  // проверяем, что источник запроса есть среди разрешённых
  if (allowedCors.includes(origin)) {
    // устанавливаем заголовок, который разрешает браузеру запросы с этого источника
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Origin', '*');
  }
  const { method } = req; // Сохраняем тип запроса (HTTP-метод) в соответствующую переменную

  // Значение для заголовка Access-Control-Allow-Methods по умолчанию (разрешены все типы запросов)
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  const requestHeaders = req.headers['access-control-request-headers'];
  if (method === 'OPTIONS') {
    // разрешаем кросс-доменные запросы любых типов (по умолчанию)
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    // разрешаем кросс-доменные запросы с этими заголовками
    res.header('Access-Control-Allow-Headers', requestHeaders);
    // завершаем обработку запроса и возвращаем результат клиенту
    return res.end();
  }
  next();
});
app.use(bodyParser.json());
app.use(requestLogger);
app.use(routes);
app.use(errorLogger);
app.use(errors());
app.use(errorCatchMiddleware);

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
