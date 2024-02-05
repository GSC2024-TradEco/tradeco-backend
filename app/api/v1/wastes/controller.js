const { StatusCodes } = require('http-status-codes');

const {
  shareWastesUser,
  getSuggestionProjects,
} = require('../../../services/sequelize/wastes');

const shareWastes = async (req, res, next) => {
  try {
    const result = await shareWastesUser(req);

    res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      msg: 'OK',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const getSuggestions = async (req, res, next) => {
  try {
    const result = await getSuggestionProjects(req);

    res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      msg: 'OK',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { shareWastes, getSuggestions };
