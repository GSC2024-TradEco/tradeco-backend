var express = require('express');
var logger = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');

const {
  errorHandlerMiddleware,
  notFoundMiddleware,
} = require('./app/middlewares');

var app = express();

const authRouter = require('./app/api/v1/auth/router');
const usersRouter = require('./app/api/v1/users/router');
const tipsRouter = require('./app/api/v1/tips/router');
const postsRouter = require('./app/api/v1/posts/router');
const projectsRouter = require('./app/api/v1/projects/router');
const wastesRouter = require('./app/api/v1/wastes/router');
const bookmarksRouter = require('./app/api/v1/bookmarks/router');
const messagesRouter = require('./app/api/v1/messages/router');

const v1 = `/api/v1`;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.get('/', (req, res) => {
  res.status(200).json({
    status: 200,
    message: 'Welcome to TradEco API',
    data: null,
  });
});

app.use(`${v1}`, authRouter);
app.use(`${v1}`, usersRouter);
app.use(`${v1}`, tipsRouter);
app.use(`${v1}`, postsRouter);
app.use(`${v1}`, projectsRouter);
app.use(`${v1}`, wastesRouter);
app.use(`${v1}`, bookmarksRouter);
app.use(`${v1}`, messagesRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

module.exports = app;
