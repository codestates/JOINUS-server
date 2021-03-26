'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ref extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  ref.init({
    auth: DataTypes.STRING,
    hashed: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ref',
  });
  return ref;
};