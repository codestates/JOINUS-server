"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class project_stack extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.project, {
        onDelete: "CASCADE",
      });
      this.belongsTo(models.stack, {
        onDelete: "CASCADE",
      });
    }
  }
  project_stack.init(
    {
      projectId: DataTypes.INTEGER,
      stackId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "project_stack",
    }
  );
  return project_stack;
};
