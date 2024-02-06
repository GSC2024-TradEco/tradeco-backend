const { StatusCodes } = require('http-status-codes');

const {
  createBookmarkProject,
  deleteBookmarkProject,
  findAllBookmarks,
} = require('../../../services/sequelize/bookmarks');

const createBookmark = async (req, res, next) => {
  try {
    const result = await createBookmarkProject(req);

    res.status(StatusCodes.CREATED).json({
      status: StatusCodes.CREATED,
      msg: 'CREATED',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const deleteBookmark = async (req, res, next) => {
  try {
    const result = await deleteBookmarkProject(req);

    res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      msg: 'OK',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const findAll = async (req, res, next) => {
  try {
    const result = await findAllBookmarks(req);

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

module.exports = { createBookmark, deleteBookmark, findAll };
