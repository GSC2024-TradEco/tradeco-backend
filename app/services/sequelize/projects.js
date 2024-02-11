const { NotFoundError } = require('../../errors');
const User = require('../../../models').User;
const Project = require('../../../models').Project;
const UserWaste = require('../../../models').UserWaste;

const findAllProjects = async (req) => {
  const { page = 1, limit = 10 } = req.query;

  const projects = await Project.findAndCountAll({
    limit,
    offset: (page - 1) * limit,
    attributes: ['id', 'title', 'image', 'createdAt'],
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
    attributes: [
      'id',
      'title',
      'description',
      'materials',
      'steps',
      'image',
      'reference',
      'createdAt',
    ],
  });
  if (!project) throw new NotFoundError('Project not found');

  const uid = '1';
  if (uid) {
    const user = await User.findOne({
      where: {
        uid,
      },
    });
    const userWastes = await UserWaste.findAll({
      where: {
        UserId: user.id,
      },
      attributes: ['name'],
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
      attributes: ['name'],
      include: {
        model: User,
        attributes: ['id', 'displayName'],
      },
    });
    project.dataValues.usersWithMissingMaterials = usersWithMissingMaterials;

    return project;
  }

  return project;
};

module.exports = { findAllProjects, findOneProject };
