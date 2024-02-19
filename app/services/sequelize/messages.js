const { BadRequestError } = require('../../errors');
const Chat = require('../../../models').Chat;
const Message = require('../../../models').Message;
const User = require('../../../models').User;

const findAllMessages = async (req) => {
  const { id } = req.params;
  const { page = 1, limit = 10 } = req.query;
  const messages = await Message.findAndCountAll({
    limit,
    offset: (page - 1) * limit,
    where: {
      ChatId: id,
    },
    include: {
      model: User,
    },
    order: [['createdAt', 'DESC']],
  });

  return {
    data: messages.rows,
    pages: Math.ceil(messages.count / limit),
    total: messages.count,
  };
};

const createOneMessage = async (req) => {
  const { chatId, text } = req.body;
  if (!text) {
    throw new BadRequestError('Text must be provided');
  }

  const { uid } = req.user;
  const user = await User.findOne({
    where: {
      uid,
    },
  });

  const chat = await Chat.findOne({
    where: {
      id: chatId,
    },
  });
  if (!chat) throw new NotFoundError('Chat not found');

  const message = await Message.create({
    ChatId: chat.id,
    UserId: user.id,
    text,
  });

  return message;
};

module.exports = { findAllMessages, createOneMessage };
