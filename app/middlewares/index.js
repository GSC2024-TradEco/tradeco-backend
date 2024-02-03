const { errorHandlerMiddleware } = require('./handle-error');
const { notFoundMiddleware } = require('./not-found');

module.exports = { errorHandlerMiddleware, notFoundMiddleware };
