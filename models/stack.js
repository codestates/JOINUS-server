"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class stack extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.user, { through: "user_stack" });
      this.belongsToMany(models.project, { through: "project_stack" });
    }
  }
  stack.init(
    {
      stackName: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "stack",
    }
  );
  return stack;
};
