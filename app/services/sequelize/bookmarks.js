const { NotFoundError, BadRequestError } = require('../../errors');

const User = require('../../../models').User;
const Project = require('../../../models').Project;
const UserBookmarkedProject = require('../../../models').UserBookmarkedProject;

const findAllBookmarks = async (req) => {
  const { uid } = req.user;
  const user = await User.findOne({
    where: { uid },
  });

  const { page = 1, limit = 10 } = req.query;
  const bookmarks = await Project.findAndCountAll({
    include: [
      {
        model: User,
        where: { id: user.id },
        through: { model: UserBookmarkedProject },
        attributes: [],
      },
    ],
  });

  return {
    data: bookmarks.rows,
    pages: Math.ceil(bookmarks.count / limit),
    total: bookmarks.count,
  };
};

const createBookmarkProject = async (req) => {
  const { uid } = req.user;
  const user = await User.findOne({
    where: { uid },
  });

  const { projectId } = req.body;
  const project = await Project.findOne({
    where: { id: projectId },
  });
  if (!project) throw new NotFoundError('Project not found');

  const [bookmark, created] = await UserBookmarkedProject.findOrCreate({
    where: {
      UserId: user.id,
      ProjectId: project.id,
    },
  });

  if (!created) throw new BadRequestError('Project already bookmarked');

  return bookmark;
};

const deleteBookmarkProject = async (req) => {
  const { uid } = req.user;
  const user = await User.findOne({
    where: { uid },
  });

  const { id } = req.params;
  const bookmarkedProject = await UserBookmarkedProject.findOne({
    where: {
      UserId: user.id,
      ProjectId: id,
    },
  });
  if (!bookmarkedProject)
    throw new NotFoundError('Bookmarked Project not found');

  await bookmarkedProject.destroy();

  return;
};

module.exports = {
  findAllBookmarks,
  createBookmarkProject,
  deleteBookmarkProject,
};
