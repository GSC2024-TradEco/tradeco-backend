const { StatusCodes } = require('http-status-codes');

const { findAllTips, findOneTip } = require('../../../services/sequelize/tips');

const findAll = async (req, res, next) => {
  try {
    const result = await findAllTips(req);

    res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      msg: 'OK',
      size: result.total,
      page: result.pages,
      data: result.data,
    });
  } catch (err) {
    next(err);
  }
};

const findOne = async (req, res, next) => {
  try {
    const result = await findOneTip(req);

    res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      msg: 'OK',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { findAll, findOne };
