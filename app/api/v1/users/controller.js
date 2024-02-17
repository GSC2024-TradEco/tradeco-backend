const { StatusCodes } = require('http-status-codes');

const {
  findOneUser,
  updateInstagramUser,
  updateLocationUser,
} = require('../../../services/sequelize/users');

const findOne = async (req, res, next) => {
  try {
    const result = await findOneUser(req);

    res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      msg: 'OK',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

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
  findOne,
  updateInstagram,
  updateLocation,
};
