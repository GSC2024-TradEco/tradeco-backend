const { StatusCodes } = require('http-status-codes');

const register = async (req, res, next) => {
  try {
    const result = await registerUser(req);

    res.status(StatusCodes.CREATED).json({
      status: StatusCodes.CREATED,
      msg: result.msg || 'Verify Mail',
      data: result.data || result,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { register };
