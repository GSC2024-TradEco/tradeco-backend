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

module.exports = { findAllPosts };
