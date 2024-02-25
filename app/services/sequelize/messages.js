const { BadRequestError, NotFoundError } = require('../../errors');
const { upload } = require('../gcs');
const { Op } = require('sequelize');
const Message = require('../../../models').Message;
const User = require('../../../models').User;

const getUserChats = async (req) => {
  const { uid } = req.user;
  const user = await User.findOne({
    where: {
      uid,
    },
  });
  if (!user) {
    throw new NotFoundError('User not found');
  }

  const { page = 1, limit = 10 } = req.query;
  // const senderChats = await Message.findAll({
  //   where: {
  //     ReceiverId: user.id,
  //   },
  //   attributes: ['SenderId'],
  //   group: ['SenderId', 'Sender.id'],
  //   include: [
  //     {
  //       model: User,
  //       as: 'Sender',
  //     },
  //   ],
  // });

  const senderChats = await User.findAll({
    where: {
      id: {
        [Op.ne]: user.id,
      },
    },
  });

  const senderChatsWithSenderKey = senderChats.map((user) => {
    return {
      Sender: user.toJSON(),
    };
  });

  return senderChatsWithSenderKey;

  // return {
  //   data: senderChats.rows,
  //   pages: Math.ceil(senderChats.count / limit),
  //   total: senderChats.count,
  // };
};

const findAllMessages = async (req) => {
  const { receiverId } = req.params;
  const receiver = await User.findOne({
    where: {
      id: receiverId,
    },
  });
  if (!receiver) {
    throw new NotFoundError('User with receiverId not found');
  }

  const { uid } = req.user;
  const sender = await User.findOne({
    where: {
      uid,
    },
  });
  if (!sender) {
    throw new NotFoundError('User with senderId not found');
  }

  const { page = 1, limit = 10 } = req.query;
  const messages = await Message.findAndCountAll({
    where: {
      [Op.or]: [
        { SenderId: sender.id, ReceiverId: receiver.id },
        { SenderId: receiver.id, ReceiverId: sender.id },
      ],
    },
    include: [
      { model: User, as: 'Sender' },
      { model: User, as: 'Receiver' },
    ],
    order: [['createdAt', 'ASC']],
  });

  return {
    data: messages.rows,
    pages: Math.ceil(messages.count / limit),
    total: messages.count,
  };
};

const createOneMessage = async (req) => {
  const { receiverId } = req.body;
  const receiver = await User.findOne({
    where: {
      id: receiverId,
    },
  });

  const { uid } = req.user;
  const sender = await User.findOne({
    where: {
      uid,
    },
  });

  const { text } = req.body;
  if (!text) {
    throw new BadRequestError('Text must be provided');
  }

  let messageImage = null;
  if (req.file) {
    messageImage = await upload(req.file);
  }

  const message = await Message.create({
    SenderId: sender.id,
    ReceiverId: receiver.id,
    text,
    image: messageImage,
  });

  return message;
};

module.exports = { getUserChats, findAllMessages, createOneMessage };
