const { NotFoundError } = require('../../errors');

const Tip = require('../../../models').Tip;

const findAllTips = async (req) => {
  const { page = 1, limit = 10 } = req.query;
  const tips = await Tip.findAndCountAll({
    limit,
    offset: (page - 1) * limit,
    attributes: ['id', 'title', 'image', 'createdAt'],
  });

  return {
    data: tips.rows,
    pages: Math.ceil(tips.count / limit),
    total: tips.count,
  };
};

const findOneTip = async (req) => {
  const { id } = req.params;

  const tip = await Tip.findOne({
    where: { id },
    attributes: ['id', 'title', 'description', 'image', 'createdAt'],
  });
  if (!tip) throw new NotFoundError('Tip not found');

  return tip;
};

module.exports = { findAllTips, findOneTip };
