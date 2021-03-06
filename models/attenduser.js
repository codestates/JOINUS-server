"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class attendUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.user, {
        onDelete: "CASCADE",
      });
      this.belongsTo(models.project, {
        onDelete: "CASCADE",
      });
    }
  }
  attendUser.init(
    {
      userId: DataTypes.INTEGER,
      projectId: DataTypes.INTEGER,
      state: DataTypes.STRING,
      checked: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "attendUser",
    }
  );
  return attendUser;
};
