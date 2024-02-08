const { Op } = require('sequelize');
const { BadRequestError } = require('../../errors');
const Project = require('../../../models').Project;
const User = require('../../../models').User;
const UserWaste = require('../../../models').UserWaste;

const createOneWaste = async (req) => {
  const uid = '1';
  const { waste } = req.body;
  if (!waste) throw new BadRequestError('No wastes provided');

  const user = await User.findOne({
    where: {
      uid,
    },
  });

  const userWaste = await UserWaste.createOne({
    name: waste,
    UserId: user.id,
  });

  return userWaste;
};

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

module.exports = { createOneWaste, getSuggestionProjects };
