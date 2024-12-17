const Sequelize = require("sequelize");
const sequelize = require("../core-configurations/sequelize-config/sequelize");

const User = require("./user")(sequelize);
const File = require("./file")(sequelize);
const Role = require("./role")(sequelize);
const Category = require("./category")(sequelize);
const Product = require("./product")(sequelize);

const db = {
  User,
  File,
  Role,
  Category,
  Product,
  sequelize,
  Sequelize,
};

if (User.associate) {
  User.associate(db);
}

module.exports = db;
