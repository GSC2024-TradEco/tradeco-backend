const { NotFoundError, BadRequestError } = require('../../errors');
const Project = require('../../../models').Project;

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

  return project;
};

module.exports = { findAllProjects, findOneProject };
