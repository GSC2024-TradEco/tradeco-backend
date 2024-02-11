const { StatusCodes } = require('http-status-codes');

const {
  getAllWastes,
  createOneWaste,
  deleteOneWaste,
  getSuggestionProjects,
} = require('../../../services/sequelize/wastes');

const getAll = async (req, res, next) => {
  try {
    const result = await getAllWastes(req);

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
      size: result.total,
      page: result.pages,
      data: result.data,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAll,
  createOne,
  deleteOne,
  getSuggestions,
};
