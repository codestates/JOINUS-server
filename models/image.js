"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class image extends Model {
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
    }
  }
  image.init(
    {
      projectId: DataTypes.INTEGER,
      image_url: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "image",
    }
  );
  return image;
};
