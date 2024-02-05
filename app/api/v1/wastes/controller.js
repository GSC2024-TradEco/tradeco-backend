const { StatusCodes } = require('http-status-codes');

const {
  getSuggestionProjects,
} = require('../../../services/sequelize/projects');

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

module.exports = { getSuggestions };
