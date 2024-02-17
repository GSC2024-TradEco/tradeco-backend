const User = require('../../../models').User;

const findOneUser = async (req) => {
  const { id } = req.params;

  const user = await User.findOne({
    where: { id },
  });
  if (!user) throw new NotFoundError('User not found');

  return user;
};

const updateInstagramUser = async (req) => {
  const { uid } = req.user;
  const user = await User.findOne({
    where: {
      uid,
    },
  });

  const { instagram } = req.body;
  user.instagram = instagram;
  await user.save();

  return user;
};

const updateLocationUser = async (req) => {
  const { uid } = req.user;
  const user = await User.findOne({
    where: {
      uid,
    },
  });

  const { longitude, latitude } = req.body;
  user.longitude = longitude;
  user.latitude = latitude;
  await user.save();

  return user;
};

module.exports = {
  findOneUser,
  updateInstagramUser,
  updateLocationUser,
};
