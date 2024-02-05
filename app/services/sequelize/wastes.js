const { Op } = require('sequelize');
const { BadRequestError } = require('../../errors');
const Project = require('../../../models').Project;
const User = require('../../../models').User;
const UserWaste = require('../../../models').UserWaste;

const shareWastesUser = async (req) => {
  const uid = '1';
  const { wastes } = req.body;
  if (!wastes) throw new BadRequestError('No wastes provided');

  const user = await User.findOne({
    where: {
      uid,
    },
  });

  const userWastesWithUserId = wastes.map((waste) => ({
    name: waste,
    UserId: user.id,
  }));

  const userWaste = await UserWaste.bulkCreate(userWastesWithUserId, {
    updateOnDuplicate: ['name'],
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

module.exports = { shareWastesUser, getSuggestionProjects };
