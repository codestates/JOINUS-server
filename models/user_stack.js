"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class user_stack extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.user, {
        onDelete: "CASCADE",
      });
      this.belongsTo(models.stack, {
        onDelete: "CASCADE",
      });
    }
  }
  user_stack.init(
    {
      userId: DataTypes.INTEGER,
      stackId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "user_stack",
    }
  );
  return user_stack;
};
