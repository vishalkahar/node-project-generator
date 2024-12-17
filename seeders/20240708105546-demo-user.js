"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // Fetch the role IDs to associate with users
    const roles = await queryInterface.sequelize.query(
      `SELECT id,name from Roles;`
    );

    const rolesRows = roles[0];

    await queryInterface.bulkInsert(
      "Users",
      [
        {
          firstname: "Vishal",
          lastname: "Kahar",
          email: "vishal.kahar@gmail.com",
          roleId: rolesRows.find((role) => role.name === "super_admin").id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstname: "Ravi",
          lastname: "Singh",
          email: "ravi.singh@gmail.com",
          roleId: rolesRows.find((role) => role.name === "admin1").id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstname: "Mehak",
          lastname: "Shrivastava",
          email: "mehak@gmail.com",
          roleId: rolesRows.find((role) => role.name === "super_agent").id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
