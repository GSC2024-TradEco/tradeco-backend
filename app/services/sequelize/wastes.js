const { Op } = require('sequelize');
const { BadRequestError } = require('../../errors');
const Project = require('../../../models').Project;

const getSuggestionProjects = async (req) => {
  const { wastes } = req.body;
  if (!wastes) throw new BadRequestError('No wastes provided');

  const projects = await Project.findAll({
    where: {
      materials: {
        [Op.overlap]: wastes,
      },
    },
  });

  return projects;
};

module.exports = { getSuggestionProjects };
