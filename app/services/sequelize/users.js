const { BadRequestError } = require('../../errors');

const User = require('../../../models').User;

const deleteUser = async (user) => {
  // Delete user from database
  try {
    await sequelize.transaction(async (t) => {
      await user.destroy({
        force: true,
        transaction: t,
      });
    });
  } catch (err) {
    throw new BadRequestError(`Could not delete user from database: ${err}`);
  }

  // Delete user from Firebase
  try {
    await admin.auth().deleteUser(user.uid);
  } catch (err) {
    throw new BadRequestError(`Could not delete user from Firebase: ${err}`);
  }
};

const findOneUser = async (req) => {
  const { id } = req.params;

  const user = await User.findOne({
    where: { id },
  });

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

const deleteAccountUser = async (req) => {
  const { uid } = req.user;
  const user = await User.findOne({
    where: {
      uid,
    },
  });

  await deleteUser(user);

  return null;
};

module.exports = {
  findOneUser,
  updateInstagramUser,
  updateLocationUser,
  deleteAccountUser,
};
