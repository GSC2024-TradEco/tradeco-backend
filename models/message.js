'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Message.belongsTo(models.User, { as: 'Sender' });
      Message.belongsTo(models.User, {
        as: 'Receiver',
      });
    }
  }
  Message.init(
    {
      SenderId: DataTypes.INTEGER,
      ReceiverId: DataTypes.INTEGER,
      text: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'Message',
    }
  );
  return Message;
};
