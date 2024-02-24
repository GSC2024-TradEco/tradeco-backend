const { BadRequestError, NotFoundError } = require('../../errors');
const { upload } = require('../gcs');
const { Op } = require('sequelize');
const Message = require('../../../models').Message;
const User = require('../../../models').User;

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
  console.log('sender.uid, receiver.uid');
  console.log(sender.uid, receiver.uid);

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

  // const { uid } = req.user;
  const uid = 'HePtihGWsOfwLFEfdeRhTBRXnrt2';
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

module.exports = { findAllMessages, createOneMessage };
