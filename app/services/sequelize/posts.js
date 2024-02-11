const { BadRequestError } = require('../../errors');
const Post = require('../../../models').Post;
const User = require('../../../models').User;

const findAllPosts = async (req) => {
  const { page = 1, limit = 10 } = req.query;
  const posts = await Post.findAndCountAll({
    limit,
    offset: (page - 1) * limit,
    attributes: ['id', 'title', 'description', 'image', 'createdAt'],
    include: {
      model: User,
      attributes: ['id', 'uid', 'displayName'],
    },
  });

  return {
    data: posts.rows,
    pages: Math.ceil(posts.count / limit),
    total: posts.count,
  };
};

const createOnePost = async (req) => {
  const uid = '1';
  const { title, description } = req.body;
  if (!title || !description) {
    throw new BadRequestError('Title and description must be provided');
  }

  const user = await User.findOne({
    where: {
      uid,
    },
  });

  const post = await Post.create({
    title,
    description,
    UserId: user.id,
  });

  return post;
};

module.exports = { findAllPosts, createOnePost };
