const { StatusCodes } = require('http-status-codes');

const {
  findAllProjects,
  findOneProject,
  getSuggestionProjects,
} = require('../../../services/sequelize/projects');

const findAll = async (req, res, next) => {
  try {
    const result = await findAllProjects(req);

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
    const result = await findOneProject(req);

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

module.exports = { findAll, findOne, getSuggestions };
