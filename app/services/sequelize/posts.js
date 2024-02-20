const { BadRequestError } = require('../../errors');
const { upload } = require('../gcs');
const Post = require('../../../models').Post;
const User = require('../../../models').User;

const findAllPosts = async (req) => {
  const { page = 1, limit = 10 } = req.query;
  const posts = await Post.findAndCountAll({
    limit,
    offset: (page - 1) * limit,
    include: {
      model: User,
    },
    order: [['createdAt', 'DESC']],
  });

  return {
    data: posts.rows,
    pages: Math.ceil(posts.count / limit),
    total: posts.count,
  };
};

const createOnePost = async (req) => {
  const { title, description } = req.body;
  if (!title || !description) {
    throw new BadRequestError('Title and description must be provided');
  }

  const { uid } = req.user;
  const user = await User.findOne({
    where: {
      uid,
    },
  });

  let postImage = null;
  if (req.file) {
    postImage = await upload(req.file);
  } 

  const post = await Post.create({
    title,
    description,
    image: postImage,
    UserId: user.id,
  });

  return post;
};

module.exports = { findAllPosts, createOnePost };
