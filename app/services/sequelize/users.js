const User = require('../../../models').User;

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

module.exports = { updateInstagramUser, updateLocationUser };
