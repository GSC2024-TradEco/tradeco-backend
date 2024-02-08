const { Op } = require('sequelize');
const { BadRequestError, NotFoundError } = require('../../errors');
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

  const userWaste = await UserWaste.create({
    name: waste,
    UserId: user.id,
  });

  return userWaste;
};

const deleteOneWaste = async (req) => {
  const uid = '1';
  const user = await User.findOne({
    where: {
      uid,
    },
  });

  const { id } = req.params;
  const userWaste = await UserWaste.findOne({
    id,
    UserId: user.id,
  });
  if (!userWaste) throw new NotFoundError('UserWaste not found');

  await userWaste.destroy();

  return;
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

module.exports = { createOneWaste, deleteOneWaste, getSuggestionProjects };
