var express = require('express');
var logger = require('morgan');
const { errorHandlerMiddleware, notFoundMiddleware } = require('./app/middlewares');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.status(200).json({
    status: 200,
    message: 'sfdf',
    data: null,
  });
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

module.exports = app;
