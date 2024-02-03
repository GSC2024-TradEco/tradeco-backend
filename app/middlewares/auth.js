const admin = require('../../config/firebase');
const { UnauthenticatedError } = require('../errors/unauthenticated');

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

    if (payload.email_verified === false) {
      throw new UnauthenticatedError('Email not Verified');
    }

    req.user = payload;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = { authenticateUser };
