'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Project.belongsToMany(models.User, {
        through: models.UserBookmarkedProject,
      });
    }
  }
  Project.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
      materials: DataTypes.ARRAY(DataTypes.STRING),
      steps: DataTypes.ARRAY(DataTypes.TEXT),
      image: DataTypes.STRING,
      reference: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Project',
    }
  );
  return Project;
};
