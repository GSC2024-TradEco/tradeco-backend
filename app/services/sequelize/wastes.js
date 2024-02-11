const { Op } = require('sequelize');
const { BadRequestError, NotFoundError } = require('../../errors');
const Project = require('../../../models').Project;
const User = require('../../../models').User;
const UserWaste = require('../../../models').UserWaste;

const getAllWastes = async (req) => {
  const uid = '1';
  const user = await User.findOne({
    where: {
      uid,
    },
  });

  const { page = 1, limit = 10 } = req.query;
  const userWastes = await UserWaste.findAndCountAll({
    limit,
    offset: (page - 1) * limit,
    where: {
      UserId: user.id,
    },
    attributes: ['id', 'name'],
  });

  return {
    data: userWastes.rows,
    pages: Math.ceil(userWastes.count / limit),
    total: userWastes.count,
  };
};

const createOneWaste = async (req) => {
  const { waste } = req.body;
  if (!waste) throw new BadRequestError('No wastes provided');

  const uid = '1';
  const user = await User.findOne({
    where: {
      uid,
    },
  });

  const [userWaste, created] = await UserWaste.findOrCreate({
    where: {
      name: waste,
      UserId: user.id,
    },
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
    where: {
      id,
      UserId: user.id,
    },
  });
  if (!userWaste) throw new NotFoundError('UserWaste not found');

  await userWaste.destroy();

  return;
};

const getSuggestionProjects = async (req) => {
  const { wastes } = req.body;
  if (!wastes) throw new BadRequestError('No wastes provided');

  const { page = 1, limit = 10 } = req.query;
  const projects = await Project.findAndCountAll({
    limit,
    offset: (page - 1) * limit,
    where: {
      materials: {
        [Op.overlap]: wastes,
      },
    },
    attributes: ['id', 'title', 'image', 'createdAt'],
  });

  return {
    data: projects.rows,
    pages: Math.ceil(projects.count / limit),
    total: projects.count,
  };
};

module.exports = {
  getAllWastes,
  createOneWaste,
  deleteOneWaste,
  getSuggestionProjects,
};
