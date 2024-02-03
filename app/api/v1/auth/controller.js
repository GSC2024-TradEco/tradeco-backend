const { StatusCodes } = require('http-status-codes');
const { registerUser } = require('../../../services/sequelize/auth');

const register = async (req, res, next) => {
  try {
    const result = await registerUser(req);

    res.status(StatusCodes.CREATED).json({
      status: StatusCodes.CREATED,
      msg: result.msg || 'CREATED',
      data: result.data || result,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { register };
