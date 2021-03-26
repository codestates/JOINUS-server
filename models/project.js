"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.user, {
        as: "writeUser",
        foreignKey: "userId",
        onDelete: "CASCADE",
      });
      this.belongsToMany(models.user, {
        as: "attendPerson",
        foreignKey: "projectId",
        through: "attendUser",
      });
      this.hasMany(models.image);
      this.belongsToMany(models.stack, { through: "project_stack" });
    }
  }
  project.init(
    {
      projectName: DataTypes.STRING,
      projectDesc: DataTypes.STRING,
      attendExpired: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      level: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "project",
    }
  );
  return project;
};
