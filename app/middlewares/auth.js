const admin = require('../../config/firebase');
const { UnauthenticatedError } = require('../errors');

const authenticateUser = async (req, res, next) => {
  try {
    let token;
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer')) {
      token = authHeader.split(' ')[1];
    }
    if (!token) {
      throw new UnauthenticatedError('Authorization Invalid');
    }

    const payload = await admin.auth().verifyIdToken(token);

    req.user = payload;
    next();
  } catch (err) {
    next(err);
  }
};

const unAuthenticateUser = async (req, res, next) => {
  try {
    let token;
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer')) {
      token = authHeader.split(' ')[1];
    }

    if (token) {
      const payload = await admin.auth().verifyIdToken(token);

      req.user = payload;
    }

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = { authenticateUser, unAuthenticateUser };
