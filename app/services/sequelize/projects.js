const { NotFoundError } = require('../../errors');
const User = require('../../../models').User;
const Project = require('../../../models').Project;
const UserWaste = require('../../../models').UserWaste;
const UserBookmarkedProject = require('../../../models').UserBookmarkedProject;

const findAllProjects = async (req) => {
  const { page = 1, limit = 10 } = req.query;

  const projects = await Project.findAndCountAll({
    limit,
    offset: (page - 1) * limit,
  });

  return {
    data: projects.rows,
    pages: Math.ceil(projects.count / limit),
    total: projects.count,
  };
};

const findOneProject = async (req) => {
  const { id } = req.params;
  const project = await Project.findOne({
    where: { id },
  });
  if (!project) throw new NotFoundError('Project not found');

  if (req.user) {
    const user = await User.findOne({
      where: {
        uid: req.user.uid,
      },
    });
    const bookmarked = await UserBookmarkedProject.findOne({
      where: {
        UserId: user.id,
        ProjectId: project.id,
      },
    });

    const userWastes = await UserWaste.findAll({
      where: {
        UserId: user.id,
      },
    });
    const userWasteMaterials = userWastes.map((waste) => waste.name);

    const projectMaterials = project.materials;
    const missingMaterials = projectMaterials.filter(
      (material) => !userWasteMaterials.includes(material)
    );

    const usersWithMissingMaterials = await UserWaste.findAll({
      where: {
        name: missingMaterials,
      },
      include: {
        model: User,
      },
    });

    project.dataValues.bookmarked = bookmarked;
    project.dataValues.missingMaterials = missingMaterials;
    project.dataValues.usersWithMissingMaterials = usersWithMissingMaterials;

    return project;
  }

  return project;
};

module.exports = { findAllProjects, findOneProject };
