"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Roles",
      [
        {
          name: "super_admin",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "admin1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "admin2",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "super_agent",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "agent",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Roles", null, {});
  },
};
