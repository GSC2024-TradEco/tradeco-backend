const admin = require('../../../config/firebase');
const { sequelize } = require('../../../models');
const { BadRequestError } = require('../../errors');
const User = require('../../../models').User;

const createUser = async (email, password, name) => {
  let firebaseUser, sequelizeUser;
  try {
    firebaseUser = await admin.auth().createUser({
      email: email,
      password: password,
      displayName: name,
    });
    const result = await sequelize.transaction(async (t) => {
      sequelizeUser = await User.create(
        {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
        },
        {
          transaction: t,
        }
      );
      return sequelizeUser;
    });
    return result;
  } catch (err) {
    if (firebaseUser) {
      await admin.auth().deleteUser(firebaseUser.uid);
    }
    throw new Error(err.message);
  }
};

const registerUser = async (req) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new BadRequestError('Name, email, and password are required');
  }

  // Check if email is already taken
  try {
    let firebaseUser = await admin.auth().getUserByEmail(email);
    if (firebaseUser) {
      const providerId = firebaseUser.providerData[0].providerId;
      if (providerId === 'google.com') {
        const [user, created] = await User.findOrCreate({
          where: {
            uid: firebaseUser.uid,
            displayName: firebaseUser.displayName,
            email: firebaseUser.email,
          },
        });

        if (created) {
          return {
            msg: `Account created with ${firebaseUser.providerData[0].providerId}`,
            data: user,
          };
        }

        if (!user) {
          await admin.auth().deleteUser(firebaseUser.uid);
          throw new Error();
        }
      }

      throw new BadRequestError(
        'Email already used. Try login using Google provider or use another email'
      );
    }
  } catch (err) {
    if (err && !(err.code === 'auth/user-not-found'))
      throw new Error(err.message);
  }

  // Create user in Firebase and PostgreSQL database
  const userCreated = await createUser(email, password, name);

  return userCreated;
};

module.exports = { registerUser };
