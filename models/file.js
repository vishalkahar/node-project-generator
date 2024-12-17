"use strict";
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class File extends Model {
    static associate(models) {}
  }

  File.init(
    {
      userId: DataTypes.INTEGER,
      filename: DataTypes.STRING,
      filepath: DataTypes.STRING,
      mimetype: DataTypes.STRING,
      filesize: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "File",
    }
  );

  return File;
};
