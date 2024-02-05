const { StatusCodes } = require('http-status-codes');

const { findAllPosts } = require('../../../services/sequelize/posts');

const findAll = async (req, res, next) => {
  try {
    const result = await findAllPosts(req);

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

module.exports = { findAll };
