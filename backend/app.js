const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const routes = require('./routes/index');
const { errorCatchMiddleware } = require('./middlewares/catchErrors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
// const { authMiddleware } = require('./middlewares/authMid');

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb', {
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
app.use(bodyParser.json());
app.use(requestLogger);
app.use(routes);
app.use(errorLogger);
app.use(errors());
app.use(errorCatchMiddleware);

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
