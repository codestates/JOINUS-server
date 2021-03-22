"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.portfolio);
      this.belongsToMany(models.stack, { through: "user_stack" });
      this.hasMany(models.project, {
        as: "myProject",
      });
      this.belongsToMany(models.project, {
        as: "attendProject",
        through: "attendUser",
      });
    }
  }
  user.init(
    {
      userName: DataTypes.STRING,
      userEmail: DataTypes.STRING,
      password: DataTypes.STRING,
      profileImage: DataTypes.STRING,
      company: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "user",
    }
  );
  return user;
};
