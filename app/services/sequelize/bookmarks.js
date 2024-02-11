const { NotFoundError } = require('../../errors');

const User = require('../../../models').User;
const Project = require('../../../models').Project;
const UserBookmarkedProject = require('../../../models').UserBookmarkedProject;

const findAllBookmarks = async (req) => {
  const { uid } = req.user;
  const user = await User.findOne({
    where: { uid },
  });
  if (!user) throw new NotFoundError('User not found');

  const { page = 1, limit = 10 } = req.query;
  const bookmarks = await UserBookmarkedProject.findAndCountAll({
    limit,
    offset: (page - 1) * limit,
    where: { UserId: user.id },
    attributes: ['id'],
    include: {
      model: Project,
      attributes: ['id', 'title', 'image'],
    },
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
  if (!user) throw new NotFoundError('User not found');

  const { projectId } = req.body;
  const project = await Project.findOne({
    where: { id: projectId },
  });
  if (!project) throw new NotFoundError('Project not found');

  const bookmark = await UserBookmarkedProject.create({
    UserId: user.id,
    ProjectId: project.id,
  });

  return bookmark;
};

const deleteBookmarkProject = async (req) => {
  const { uid } = req.user;
  const user = await User.findOne({
    where: { uid },
  });
  if (!user) throw new NotFoundError('User not found');

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
