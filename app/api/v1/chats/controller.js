const { StatusCodes } = require('http-status-codes');

const {
  findAllChats,
  createOneChat,
  findChatUser,
} = require('../../../services/sequelize/chats');

const findAll = async (req, res, next) => {
  try {
    const result = await findAllChats(req);

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
    const result = await createOneChat(req);

    res.status(StatusCodes.CREATED).json({
      status: StatusCodes.CREATED,
      msg: 'OK',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const findChat = async (req, res, next) => {
  try {
    const result = await findChatUser(req);

    res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      msg: 'OK',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { findAll, createOne, findChat };
