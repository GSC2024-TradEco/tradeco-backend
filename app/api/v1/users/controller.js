const { StatusCodes } = require('http-status-codes');

const {
  updateInstagramUser,
  updateLocationUser,
} = require('../../../services/sequelize/users');

const updateInstagram = async (req, res, next) => {
  try {
    const result = await updateInstagramUser(req);

    res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      msg: 'OK',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const updateLocation = async (req, res, next) => {
  try {
    const result = await updateLocationUser(req);

    res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      msg: 'OK',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  updateInstagram,
  updateLocation,
};
