const { StatusCodes } = require('http-status-codes');

const {
  createOneWaste,
  deleteOneWaste,
  getSuggestionProjects,
} = require('../../../services/sequelize/wastes');

const createOne = async (req, res, next) => {
  try {
    const result = await createOneWaste(req);

    res.status(StatusCodes.CREATED).json({
      status: StatusCodes.CREATED,
      msg: 'CREATED',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const deleteOne = async (req, res, next) => {
  try {
    const result = await deleteOneWaste(req);

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

module.exports = { createOne, deleteOne, getSuggestions };
