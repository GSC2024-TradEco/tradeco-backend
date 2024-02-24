const { NotFoundError } = require('../../errors');

const Tip = require('../../../models').Tip;

const findAllTips = async (req) => {
  const { page = 1, limit = 10 } = req.query;
  const tips = await Tip.findAndCountAll({});

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
  });
  if (!tip) throw new NotFoundError('Tip not found');

  return tip;
};

const getRandomTip = async () => {
  const totalCount = await Tip.count();
  const randomId = Math.floor(Math.random() * totalCount) + 1;

  const tip = await Tip.findOne({
    where: { id: randomId },
  });
  if (!tip) throw new NotFoundError('Tip not found');

  return tip;
};

module.exports = { findAllTips, findOneTip, getRandomTip };
